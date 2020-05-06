import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

import {paths} from '../../../shared/constants/paths';
import {routesFrontend} from '../../../shared/constants/routes-frontend';
import {utilDOM} from '../../../shared/util.dom';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {Address} from '../../models/address';
import {AddressService} from '../../services/address.service';
import {ShippingService} from '../../services/shipping.service';
import {ModalAddressComponent} from '../../components/dialogs/modal-address/modal-address.component';
import {CartService} from '../../services/cart.service';
import {ModalManageAddressComponent} from '../../components/dialogs/modal-manage-address/modal-manage-address.component';
import {getPaymentMethods, PaymentMethod} from '../../../shared/constants/payment-methods';
import {PaymentService} from '../../services/payment.service';
import {OrderAdd} from '../../models/order';
import {CheckoutOrder} from '../../models/checkout-order';
import {DeliveryOption, DeliveryOptionType} from '../../models/shipping/delivery';
import {ModalShippingMatComponent} from '../../components/dialogs/modal-shipping-mat/modal-shipping-mat.component';
import {OrderService} from '../../services/order.service';
import {ItemOrderAdd} from '../../models/item-order';

declare let PagSeguroLightbox: any;
declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit, OnDestroy {

  @ViewChild('paypal') paypalElement!: ElementRef;
  readonly paymentMethods: PaymentMethod[] = getPaymentMethods(`${paths.assets}/payments`);
  readonly routes = routesFrontend;
  addressesUser: Address[] = [];
  addressDelivery?: Address;
  checkout: CheckoutOrder;
  productsPreview: Product[] = [];
  productsCost = 0;
  deliveryCost = 0;
  private _modalAddressSelect$?: Subscription;

  constructor(
    private readonly _addressServ: AddressService,
    private readonly _dialog: MatDialog,
    private readonly _paymentServ: PaymentService,
    private readonly _productServ: ProductService,
    private readonly _shippingServ: ShippingService
  ) {
    this.checkout = CartService.getOrder() as CheckoutOrder;

    if (!this.checkout.optionDeliveryType) {
      this.checkout.optionDeliveryType = DeliveryOptionType.PAC;
    }
    if (this.checkout.addressTargetId) {
      this._addressServ.getById(this.checkout.addressTargetId)
        .subscribe((a?: Address) => this.addressDelivery = a);
    } else {
      this._addressServ.get()
        .subscribe((addresses: Address[]) => {
          if (addresses.length) {
            this.addressesUser = addresses;
            this.addressDelivery = addresses[0];
            this.checkout.addressTargetId = this.addressDelivery.id;
          }
        });
    }

    // Se no carrinho houver ids de produtos, então busque eles no backend
    if (this.checkout.items) {
      this._productServ.get({
        ids: this.checkout.items.map(p => p.productId),
        currentPage: 1,
        perPage: Number.MAX_SAFE_INTEGER
      }).subscribe((prods: Product[]) => {
        this.productsPreview = prods.slice(0, 3);
        this.productsCost = OrderService.calculateCostItems(this.checkout.items);
        this._injectTitleResumeProducts(prods);

        if (this.addressDelivery) {
          this._updateCostDelivery(this.addressDelivery.zipCode, DeliveryOptionType.PAC, this.checkout.items);
        }
      });
    }
  }

  productTracking(p: Product): string {
    return p.id;
  }

  ngAfterViewInit() {
    utilDOM.setBodyBackgroundColor('#eee');
    this._paymentServ.initScriptPaypal(
      paypal, this.checkout as OrderAdd,
      (order: OrderAdd) => this.payWithPaypal(this._paymentServ, order),
      () => !!this.addressDelivery,
      this.paypalElement.nativeElement,
      () => this.showModalManageAddress()
    );
  }

  ngOnDestroy() {
    utilDOM.setBodyBackgroundColor('unset');
    if (this._modalAddressSelect$) {
      this._modalAddressSelect$.unsubscribe();
    }
  }

  showModalManageAddress() {
    const modalAddr = this._dialog.open(
      ModalManageAddressComponent,
      ModalManageAddressComponent.getConfig({address: this.addressDelivery})
    );
    modalAddr.componentInstance.action
      .pipe(take(1))
      .subscribe((address: Address) => {
        modalAddr.close();
        this.addressDelivery = address;
        this.checkout.addressTargetId = address.id;
        this.showModalShipping(address.zipCode);
      });
  }

  showModalSelectionAddress() {
    this._addressServ.get()
      .pipe(take(1))
      .subscribe((addresses: Address[]) => {
        this._showModalSelectionAddress(
          addresses, this._dialog, (address: Address) => {
            this._dialog.closeAll();
            this.addressDelivery = address;
            this.checkout.addressTargetId = address.id;
            this.showModalShipping(address.zipCode);
          });
      });
  }

  showModalShipping(zipCode: string) {
    this._showModalShipping(
      zipCode, this.checkout.items, this._dialog,
      () => {
        this._dialog.closeAll();
        this.showModalSelectionAddress();
      },
      (opt: DeliveryOption) => {
        this.deliveryCost = opt.cost;
        this.checkout.optionDeliveryType = opt.typeService;
      }
    );
  }

  // TODO: Limpar carrinho, storage e redirecionar
  payWithPagSeguro() {
    if (this.addressDelivery) {
      this._paymentServ.payWithPagSeguro(this.checkout as OrderAdd)
        .subscribe((idTransaction: string) =>
          PagSeguroLightbox(
            idTransaction,
            {
              success: () => console.log('finalizado'),
              abort: () => console.log('cancelado')
            }
          )
        );
    } else {
      this.showModalManageAddress();
    }
  }

  // TODO: Limpar carrinho, storage e redirecionar
  payWithPaypal(paymentServ: PaymentService, order: OrderAdd): Promise<string> {
    return paymentServ.payWithPaypal(order).toPromise();
  }

  // TODO: Finalizar implementação
  private _finishOrder() {

  }

  private _injectTitleResumeProducts(products: Product[]) {
    const elemAnchor = document.getElementById('resume-products') as HTMLAnchorElement;

    if (elemAnchor) {
      const title = products
        .slice(0, 3)
        .map(p => p.title
          .split(' ')
          .slice(0, 4)
          .join(' ')
        ).join(', ');
      const quantityProductHidden = products.length - 3;
      const textProductHidden = quantityProductHidden > 0
        ? `e mais ${quantityProductHidden} item(s)`
        : '';
      elemAnchor.innerHTML = `
        ${title}
        <span *ngIf="productQuantityHidden > 0" class="text--bold">
          ${textProductHidden}
        </span>
      `;
    }
  }

  private _showModalSelectionAddress(
    addresses: Address[], dialog: MatDialog, onChosenAddress: (address: Address) => any
  ) {
    let tempAddress: Address;
    const modalAddr = dialog.open(
      ModalAddressComponent,
      ModalAddressComponent.getConfig({showInputCEP: false, addresses})
    );
    modalAddr.componentInstance.chosenAddress
      .pipe(take(1))
      .subscribe((addr: Address) => tempAddress = addr);
    modalAddr.componentInstance.action
      .pipe(take(1))
      .subscribe(() => onChosenAddress(tempAddress));
  }

  private _showModalShipping(
    zipcode: string, items: ItemOrderAdd[], dialog: MatDialog,
    fnSelectAddress: () => any, fnDeliveryOpt: (opt: DeliveryOption) => any
  ) {
    const dialogRef = dialog.open(
      ModalShippingMatComponent,
      ModalShippingMatComponent.getConfig({zipcode, items})
    );
    dialogRef.componentInstance.action
      .pipe(take(1))
      .subscribe((delivery: DeliveryOption) => fnDeliveryOpt(delivery));
    dialogRef.componentInstance.selectAddress
      .pipe(take(1))
      .subscribe(() => fnSelectAddress());
  }

  private _updateCostDelivery(
    zipCode: string, typeShipping: DeliveryOptionType, items: ItemOrderAdd[]
  ) {
    this._shippingServ.calculateCostDays(zipCode, items)
      .subscribe(deliveryOpts => this.deliveryCost = (deliveryOpts
        .find(opt => opt.typeService === typeShipping) as DeliveryOption)
        .cost
      );
  }
}

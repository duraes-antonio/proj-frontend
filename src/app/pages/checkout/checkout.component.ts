import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

import {paths} from '../../../shared/constants/paths';
import {paymentConfig} from '../../../shared/config/payments';
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
import {IPayPalConfig} from 'ngx-paypal';
import {getPaymentMethods, PaymentMethod} from '../../../shared/constants/payment-methods';
import {PaymentService} from '../../services/payment.service';
import {OrderAdd} from '../../models/order';
import {CheckoutOrder} from '../../models/checkout-order';
import {ItemOrderAdd} from '../../models/item-order';
import {DeliveryOptionType} from '../../models/shipping/delivery';
import {OrderService} from '../../services/order.service';

declare let PagSeguroLightbox: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit, OnDestroy {
  readonly paymentMethods: PaymentMethod[] = getPaymentMethods(`${paths.assets}/payments`);
  readonly routes = routesFrontend;
  readonly payPalConfig: IPayPalConfig = paymentConfig.getPaypalConfig({
    onApprove: (data, actions) => this.payWithPaypal(data),
    onClientAuthorization: (re) => this.payWithPaypal(re)
  });
  addressesUser: Address[] = [];
  addressDelivery?: Address;

  checkout: CheckoutOrder;
  productsPreview: Product[] = [];

  productsCost = 0;
  deliveryCost = 0;
  private _modalAddressSelect$?: Subscription;
  private _mercadoPagoTransationId = '';

  constructor(
    private readonly _addressServ: AddressService,
    private readonly _dialog: MatDialog,
    private readonly _orderServ: OrderService,
    private readonly _paymentServ: PaymentService,
    private readonly _productServ: ProductService,
    private readonly _shippingServ: ShippingService
  ) {
    this.checkout = CartService.getOrder() as CheckoutOrder;

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
        this.productsCost = this.checkout.items
          .map(item => item.unitPrice * item.quantity)
          .reduce((prevPrice, currPrice) => prevPrice + currPrice);
        this._injectTitleResumeProducts(prods);

        if (this.addressDelivery) {
          this._updateCostDelivery(this.addressDelivery.zipCode, this.checkout.items);
        }
      });
    }
  }

  productTracking(p: Product): string {
    return p.id;
  }

  ngAfterViewInit(): void {
    utilDOM.setBodyBackgroundColor('#eee');
    const elem = document.getElementById('button-mp');

    if (elem) {
      this._payWithMercadoPago(this._paymentServ);
    }
  }

  ngOnDestroy(): void {
    utilDOM.setBodyBackgroundColor('unset');
    if (this._modalAddressSelect$) {
      this._modalAddressSelect$.unsubscribe();
    }
  }

  showModalSelectionAddress() {
    this._addressServ.get()
      .subscribe((addresses: Address[]) => {
        this._showModalSelectionAddress(addresses);
      });
  }

  showModalManageAddress() {
    const modalAddr = this._dialog.open(
      ModalManageAddressComponent,
      ModalManageAddressComponent.getConfig({address: this.addressDelivery})
    );
    modalAddr.componentInstance.action
      .pipe(take(1))
      .subscribe((address: Address) => {
        this.addressDelivery = address;
        this.checkout.addressTargetId = address.id;
        this._updateCostDelivery(address.zipCode, this.checkout?.items);
      });
  }

  payWithPagSeguro(paymentServ: PaymentService, order: OrderAdd) {
    paymentServ.payWithPagSeguro(order)
      .subscribe((idTransaction: string) =>
        PagSeguroLightbox(
          idTransaction,
          {
            success: () => console.log('finalizado'),
            abort: () => console.log('cancelado')
          }
        )
      );
  }

  payWithPaypal(data?: any) {
    console.log('Pagamento aprovado!!!', data);
    this._saveOrder(this.checkout as OrderAdd);
  }

  paymentHandler(
    address: Address, fnPayment: (payServ: PaymentService, order: OrderAdd) => void
  ): void {
    if (address) {
      this.checkout.optionDeliveryType = DeliveryOptionType.SEDEX;
      fnPayment(this._paymentServ, this.checkout as OrderAdd);
    } else {
      this.showModalManageAddress();
    }
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

  private _payWithMercadoPago(paymentServ: PaymentService) {
    if (this._mercadoPagoTransationId.length) {
      return;
    }
    paymentServ.payWithMercadoPago()
      .subscribe((idTransaction: string) => {
        this._mercadoPagoTransationId = idTransaction;
        (document.getElementById('button-mp') as HTMLAnchorElement).href = `
      https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${idTransaction}`;
      });
  }

  // TODO: Finalizar função
  private _saveOrder(order: OrderAdd) {
    this._orderServ.post(order).subscribe(() => console.log('Pedido salvo!!!'));
  }

  private _showModalSelectionAddress(addresses: Address[]) {
    let tempAddress: Address;
    const modalAddr = this._dialog.open(
      ModalAddressComponent,
      ModalAddressComponent.getConfig({showInputCEP: false, addresses})
    );
    this._modalAddressSelect$ = modalAddr.componentInstance.chosenAddress
      .subscribe((addr: Address) => tempAddress = addr);
    modalAddr.componentInstance.action
      .pipe(take(1))
      .subscribe(() => {
        this.addressDelivery = tempAddress;
        this.checkout.addressTargetId = tempAddress.id;
        this._updateCostDelivery(tempAddress.zipCode, this.checkout.items);
      });
  }

  private _updateCostDelivery(zipCode: string, items: ItemOrderAdd[]) {
    // TODO: Ver caso de escolha de opção de frete
    this._shippingServ.calculateCostDays(zipCode, items)
      .subscribe(deliveryOpt => this.deliveryCost = deliveryOpt[1].cost);
  }
}


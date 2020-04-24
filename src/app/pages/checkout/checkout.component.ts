import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {paths} from '../../../shared/constants/paths';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {Address} from '../../models/address';
import {routesFrontend} from '../../../shared/constants/routesFrontend';
import {take} from 'rxjs/operators';
import {AddressService} from '../../services/address.service';
import {utilDOM} from '../../../shared/util.dom';
import {ShippingService} from '../../services/shipping.service';
import {ModalAddressComponent} from '../../components/dialogs/modal-address/modal-address.component';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {CartService} from '../../services/cart.service';
import {ModalManageAddressComponent} from '../../components/dialogs/modal-manage-address/modal-manage-address.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit, OnDestroy {

  addressesUser: Address[] = [];
  readonly paymentMethods: PaymentMethod[] = this._getPaymentMethods(`${paths.assets}/payments`);
  readonly routes = routesFrontend;
  addressDelivery?: Address;
  methodChosen?: PaymentMethod;
  products: Product[] = [];
  productsQuantity: [Product, number][] = [];
  productsPreview: Product[] = [];
  productsPreviewTitle = '';
  productQuantityHidden = 0;
  productsCost = 0;
  deliveryCost = 0;
  private _modalAddressSelect$?: Subscription;

  constructor(
    private readonly _addressServ: AddressService,
    private readonly _dialog: MatDialog,
    private readonly _productServ: ProductService,
    private readonly _shippingServ: ShippingService
  ) {
    this._addressServ.get()
      .subscribe((addresses: Address[]) => {
        if (addresses.length) {
          this.addressesUser = addresses;
          this.addressDelivery = addresses[0];
        }
      });

    const order = CartService.getOrder();

    // Se no carrinho houver ids de produtos, então busque eles no backend
    if (order?.productsIdQuantity) {
      this._productServ.get({
        ids: order.productsIdQuantity.map(p => p.productId),
        currentPage: 1,
        perPage: 3
      }).pipe(take(1))
        .subscribe((prods: Product[]) => {
          this.productsQuantity = order.productsIdQuantity
            .map(prodQuantity => [
              prods.find(p => p.id === prodQuantity.productId) as Product,
              prodQuantity.quantity
            ]);
          this.productsPreview = prods.slice(0, 3);
          this.productsPreviewTitle = this.productsPreview
            .map(p => p.title.split(' ').slice(0, 4).join(' '))
            .join(', ');
          this.productQuantityHidden = prods.length - 3;
          this.productsCost = ProductService.calculateCostFromArray(this.productsQuantity);

          if (this.addressDelivery) {
            this._updateCostDelivery(this.addressDelivery.zipCode, this.productsQuantity);
          }
        });
    }
  }

  ngAfterViewInit(): void {
    utilDOM.setBodyBackgroundColor('#eee');
  }

  ngOnDestroy(): void {
    utilDOM.setBodyBackgroundColor('unset');
    if (this._modalAddressSelect$) {
      this._modalAddressSelect$.unsubscribe();
    }
  }

  selectPayMethod(paymentMethod: PaymentMethod) {
    if (this.addressDelivery) {
      this.methodChosen = paymentMethod;
    } else {
      this.showModalManageAddress();
    }
  }

  showModalSelectionAdress() {
    this._addressServ.get()
      .subscribe((addresses: Address[]) => {
        this._showModalSelectionAdress(addresses);
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
        this._updateCostDelivery(address.zipCode, this.productsQuantity);
      });
  }

  private _showModalSelectionAdress(addresses: Address[]) {
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
        this._updateCostDelivery(tempAddress.zipCode, this.productsQuantity);
      });
  }

  private _getCardPaymentOptions(pathDirPaymentsImages: string): PaymentMethodOption[] {
    return [
      {title: EPaymentName.AMERICAN_EXPRESS, urlImage: `${pathDirPaymentsImages}/american-express.webp`},
      {title: EPaymentName.DINERS, urlImage: `${pathDirPaymentsImages}/diners.webp`},
      {title: EPaymentName.ELO, urlImage: `${pathDirPaymentsImages}/elo.webp`},
      {title: EPaymentName.HIPER, urlImage: `${pathDirPaymentsImages}/hiper.webp`},
      {title: EPaymentName.HIPERCARD, urlImage: `${pathDirPaymentsImages}/hipercard.webp`},
      {title: EPaymentName.MASTERCARD, urlImage: `${pathDirPaymentsImages}/mastercard.webp`},
      {title: EPaymentName.VISA, urlImage: `${pathDirPaymentsImages}/visa.webp`},
    ];
  }

  private _getPaymentMethods(pathDirPaymentsImages: string): PaymentMethod[] {
    const anotherOptions = this._getSecondaryPaymentOptions(pathDirPaymentsImages);
    const cardOptions = this._getCardPaymentOptions(pathDirPaymentsImages);
    return [
      {
        urlImageMethod: `${pathDirPaymentsImages}/methods/pagseguro.webp`,
        anothersOptions: anotherOptions
          .filter(opt => opt.title !== EPaymentName.MERCADO_PAGO
            && opt.title !== EPaymentName.PAYPAL
          ),
        cardOptions: cardOptions,
        title: 'PagSeguro'
      },
      {
        urlImageMethod: `${pathDirPaymentsImages}/methods/mercado-pago.webp`,
        anothersOptions: anotherOptions
          .filter(opt => opt.title !== EPaymentName.PAGSEGURO
            && opt.title !== EPaymentName.PAYPAL
          ),
        cardOptions: cardOptions.filter(opt => opt.title !== EPaymentName.HIPER),
        title: 'Mercado pago'
      },
      {
        urlImageMethod: `${pathDirPaymentsImages}/methods/paypal.webp`,
        anothersOptions: anotherOptions
          .filter(opt => opt.title === EPaymentName.PAYPAL),
        cardOptions: cardOptions.filter(opt => opt.title !== EPaymentName.DINERS),
        title: 'PayPal'
      },
    ];
  }

  private _getSecondaryPaymentOptions(pathDirPaymentsImages: string): PaymentMethodOption[] {
    return [
      {title: EPaymentName.BOLETO, urlImage: `${pathDirPaymentsImages}/boleto.webp`},
      {title: EPaymentName.MERCADO_PAGO, urlImage: `${pathDirPaymentsImages}/mercado-pago.webp`},
      {title: EPaymentName.PAGSEGURO, urlImage: `${pathDirPaymentsImages}/pagseguro.webp`},
      {title: EPaymentName.PAYPAL, urlImage: `${pathDirPaymentsImages}/paypal.webp`},
    ];
  }

  private _updateCostDelivery(zipCode: string, productsQuantity: [Product, number][]) {
    // TDOO: Ver caso de escolha de opção de frete
    this._shippingServ.calculateCostDays(
      zipCode,
      productsQuantity.map(prodQuantity => {
        return {productId: prodQuantity[0].id, quantity: prodQuantity[1]};
      })
    ).pipe(take(1))
      .subscribe(deliveryOpt => this.deliveryCost = deliveryOpt[1].cost);
  }
}

interface PaymentMethodOption {
  readonly title: string;
  readonly urlImage: string;
}

interface PaymentMethod {
  readonly anothersOptions: PaymentMethodOption[];
  readonly cardOptions: PaymentMethodOption[];
  readonly title: string;
  readonly urlImageMethod: string;
}

enum EPaymentName {
  AMERICAN_EXPRESS = 'American Express',
  BOLETO = 'Boleto',
  DINERS = 'Diners',
  ELO = 'Elo',
  HIPER = 'Hiper',
  HIPERCARD = 'Hipercard',
  MASTERCARD = 'Mastercard',
  MERCADO_PAGO = 'Créditos no Mercado Pago',
  PAGSEGURO = 'Créditos no PagSeguro',
  PAYPAL = 'Créditos no Paypal',
  VISA = 'Visa',
}

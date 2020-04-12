import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {paths} from '../../../shared/constants/paths';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {Address} from '../../models/address';
import {routesFrontend} from '../../../shared/constants/routesFrontend';
import {take} from 'rxjs/operators';
import {AddressService} from '../../services/address.service';
import {utilDOM} from '../../../shared/util.dom';
import {AuthService} from '../../services/auth.service';
import {ShippingService} from '../../services/shipping.service';
import {ModalAddressComponent} from '../../components/modais/modal-address/modal-address.component';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {CartService} from '../../services/cart.service';
import {ModalManageAddressComponent} from '../../components/modais/modal-create-address/modal-manage-address.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit, OnDestroy {

  addressesUser: Address[] = [];
  readonly paymentMethods: PaymentMethod[] = this.getPaymentMethods();
  readonly routes = routesFrontend;
  addressDelivery?: Address;
  methodChosen?: PaymentMethod;
  products: Product[] = [];
  productsQuantity: [Product, number][] = [];
  productsPreview: Product[] = [];
  productsPreviewTitle = '';
  productQuantityHidden = 0;
  private readonly _pathImagesPayment = `${paths.assets}/payments`;
  productsCost = 0;
  deliveryCost = 0;
  private _modalAddressSelect$?: Subscription;

  constructor(
    private _addressServ: AddressService,
    private _dialog: MatDialog,
    private _productServ: ProductService,
    private _shippingServ: ShippingService
  ) {
    if (AuthService.isLoggedIn()) {
      this._addressServ.get()
        .pipe(take(1))
        .subscribe((addresses: Address[]) => {
          if (!addresses.length) {
            this.addressesUser = addresses;
            this.addressDelivery = addresses[0];
          }
        });
    }

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
            this.updateCostDelivery(this.addressDelivery.zipCode, this.productsQuantity);
          }
        });
    }
  }

  ngAfterViewInit(): void {
    utilDOM.setBodyBackgroundColor('#eee');
  }

  ngOnDestroy(): void {
    utilDOM.setBodyBackgroundColor('unset');
    this._modalAddressSelect$?.unsubscribe();
  }

  selectPayMethod(paymentMethod: PaymentMethod) {
    this.methodChosen = paymentMethod;
  }

  showModalSelectionAdress() {
    let tempAddress: Address;
    const modalAddr = this._dialog.open(
      ModalAddressComponent,
      ModalAddressComponent.getConfig({showInputCEP: false, addresses: this.addressesUser})
    );
    this._modalAddressSelect$ = modalAddr.componentInstance.chosenAddress
      .subscribe((addr: Address) => tempAddress = addr);
    modalAddr.componentInstance.action
      .pipe(take(1))
      .subscribe(() => {
        this.addressDelivery = tempAddress;
        this.updateCostDelivery(tempAddress.zipCode, this.productsQuantity);
      });
  }

  showModalAddAdress() {
    const modalAddr = this._dialog.open(
      ModalManageAddressComponent,
      ModalManageAddressComponent.getConfig({address: this.addressDelivery})
    );
    modalAddr.componentInstance.action
      .pipe(take(1))
      .subscribe((address: Address) => {
        this.addressDelivery = address;
        this.updateCostDelivery(address.zipCode, this.productsQuantity);
      });
  }

  private getCardPaymentOptions(): PaymentMethodOption[] {
    return [
      {title: EPaymentName.AMERICAN_EXPRESS, urlImage: `${this._pathImagesPayment}/american-express.webp`},
      {title: EPaymentName.DINERS, urlImage: `${this._pathImagesPayment}/diners.webp`},
      {title: EPaymentName.ELO, urlImage: `${this._pathImagesPayment}/elo.webp`},
      {title: EPaymentName.HIPER, urlImage: `${this._pathImagesPayment}/hiper.webp`},
      {title: EPaymentName.HIPERCARD, urlImage: `${this._pathImagesPayment}/hipercard.webp`},
      {title: EPaymentName.MASTERCARD, urlImage: `${this._pathImagesPayment}/mastercard.webp`},
      {title: EPaymentName.VISA, urlImage: `${this._pathImagesPayment}/visa.webp`},
    ];
  }

  private getPaymentMethods(): PaymentMethod[] {
    const anotherOptions = this.getSecondaryPaymentOptions();
    const cardOptions = this.getCardPaymentOptions();
    return [
      {
        urlImageMethod: `${this._pathImagesPayment}/methods/pagseguro.webp`,
        anothersOptions: anotherOptions
          .filter(opt => opt.title !== EPaymentName.MERCADO_PAGO
            && opt.title !== EPaymentName.PAYPAL
          ),
        cardOptions: cardOptions,
        title: 'PagSeguro'
      },
      {
        urlImageMethod: `${this._pathImagesPayment}/methods/mercado-pago.webp`,
        anothersOptions: anotherOptions
          .filter(opt => opt.title !== EPaymentName.PAGSEGURO
            && opt.title !== EPaymentName.PAYPAL
          ),
        cardOptions: cardOptions.filter(opt => opt.title !== EPaymentName.HIPER),
        title: 'Mercado pago'
      },
      {
        urlImageMethod: `${this._pathImagesPayment}/methods/paypal.webp`,
        anothersOptions: anotherOptions
          .filter(opt => opt.title === EPaymentName.PAYPAL),
        cardOptions: cardOptions.filter(opt => opt.title !== EPaymentName.DINERS),
        title: 'PayPal'
      },
    ];
  }

  private getSecondaryPaymentOptions(): PaymentMethodOption[] {
    return [
      {title: EPaymentName.BOLETO, urlImage: `${this._pathImagesPayment}/boleto.webp`},
      {title: EPaymentName.MERCADO_PAGO, urlImage: `${this._pathImagesPayment}/mercado-pago.webp`},
      {title: EPaymentName.PAGSEGURO, urlImage: `${this._pathImagesPayment}/pagseguro.webp`},
      {title: EPaymentName.PAYPAL, urlImage: `${this._pathImagesPayment}/paypal.webp`},
    ];
  }

  private updateCostDelivery(zipCode: string, productsQuantity: [Product, number][]) {
    this._shippingServ.calculateCostDays(
      zipCode,
      productsQuantity.map(prodQuantity => {
        return {productId: prodQuantity[0].id, quantity: prodQuantity[1]};
      })
    ).pipe(take(1))
      .subscribe(deliveryOpt => this.deliveryCost = deliveryOpt.cost);
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

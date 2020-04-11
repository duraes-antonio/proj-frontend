import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {paths} from '../../../shared/constants/paths';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {Address} from '../../models/address';
import {routesFrontend} from '../../../shared/constants/routesFrontend';
import {take} from 'rxjs/operators';
import {AddressService} from '../../services/address.service';
import {utilDOM} from '../../../shared/util.dom';
import {CheckoutModel} from '../../models/checkout.model';
import {AuthService} from '../../services/auth.service';
import {ShippingService} from '../../services/shipping.service';
import {Observable} from 'rxjs';
import {DeliveryOption} from '../../models/deliveryOption';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit, OnDestroy {

  private _pathImagesPayment = `${paths.assets}/payments`;
  readonly paymentMethods: PaymentMethod[] = this.getPaymentMethods();
  readonly routes = routesFrontend;
  addressDelivery?: Address;
  methodChosen?: PaymentMethod;
  productsPreview: Product[] = [];
  productsPreviewTitle = '';
  productQuantityHidden = 0;
  productsCost = 0;
  deliveryCost = 0;

  constructor(
    private _addressServ: AddressService,
    private _productServ: ProductService,
    private _shippingServ: ShippingService
  ) {
    if (AuthService.isLoggedIn()) {
      this._addressServ.getMain()
        .pipe(take(1))
        .subscribe((address?: Address) => this.addressDelivery = address);
    }

    const checkout = this.getCheckoutData();

    // Se no carrinho houver ids de produtos, então busque eles no backend
    if (checkout?.productsIdQuantity) {
      this._productServ.get({
        ids: checkout.productsIdQuantity.map(p => p.productId),
        currentPage: 1,
        perPage: 3
      }).pipe(take(1))
        .subscribe((prods: Product[]) => {
          this.productsPreview = prods.slice(0, 3);
          this.productsPreviewTitle = this.productsPreview
            .map(p => p.title.split(' ').slice(0, 4).join(' '))
            .join(', ');
          this.productQuantityHidden = prods.length - 3;
          const prodsQuantity: [Product, number][] = checkout.productsIdQuantity
            .map(prodQuantity => [
              prods.find(p => p.id === prodQuantity.productId) as Product,
              prodQuantity.quantity
            ]);
          this.productsCost = ProductService.calculateCostFromArray(prodsQuantity);

          if (this.addressDelivery) {
            this._shippingServ.calculateCostDays(
              this.addressDelivery.zipCode, checkout?.productsIdQuantity
            ).pipe(take(1))
              .subscribe(deliveryOpt => this.deliveryCost = deliveryOpt.cost);
          }
        });
    }
  }

  ngAfterViewInit(): void {
    utilDOM.setBodyBackgroundColor('#eee');
  }

  ngOnDestroy(): void {
    utilDOM.setBodyBackgroundColor('unset');
  }

  selectPayMethod(paymentMethod: PaymentMethod) {
    this.methodChosen = paymentMethod;
  }

  private getCheckoutData(): CheckoutModel | undefined {
    const checkout = localStorage.getItem('order');
    return checkout ? JSON.parse(checkout) : undefined;
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

  private getSecondaryPaymentOptions(): PaymentMethodOption[] {
    return [
      {title: EPaymentName.BOLETO, urlImage: `${this._pathImagesPayment}/boleto.webp`},
      {title: EPaymentName.MERCADO_PAGO, urlImage: `${this._pathImagesPayment}/mercado-pago.webp`},
      {title: EPaymentName.PAGSEGURO, urlImage: `${this._pathImagesPayment}/pagseguro.webp`},
      {title: EPaymentName.PAYPAL, urlImage: `${this._pathImagesPayment}/paypal.webp`},
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

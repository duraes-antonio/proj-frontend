import {Component} from '@angular/core';
import {paths} from '../../../shared/constants/paths';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {Address} from '../../models/address';
import {routesFrontend} from '../../../shared/constants/routesFrontend';
import {take} from 'rxjs/operators';
import {AddressService} from '../../services/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  private _pathImagesPayment = `${paths.assets}/payments`;
  private _cardOptions: PaymentMethodOption[] = [
    {title: EPaymentName.AMERICAN_EXPRESS, urlImage: `${this._pathImagesPayment}/american-express.webp`},
    {title: EPaymentName.DINERS, urlImage: `${this._pathImagesPayment}/diners.webp`},
    {title: EPaymentName.ELO, urlImage: `${this._pathImagesPayment}/elo.webp`},
    {title: EPaymentName.HIPER, urlImage: `${this._pathImagesPayment}/hiper.webp`},
    {title: EPaymentName.HIPERCARD, urlImage: `${this._pathImagesPayment}/hipercard.webp`},
    {title: EPaymentName.MASTERCARD, urlImage: `${this._pathImagesPayment}/mastercard.webp`},
    {title: EPaymentName.VISA, urlImage: `${this._pathImagesPayment}/visa.webp`},
  ];
  private _anotherOptions: PaymentMethodOption[] = [
    {title: EPaymentName.BOLETO, urlImage: `${this._pathImagesPayment}/boleto.webp`},
    {title: EPaymentName.MERCADO_PAGO, urlImage: `${this._pathImagesPayment}/mercado-pago.webp`},
    {title: EPaymentName.PAGSEGURO, urlImage: `${this._pathImagesPayment}/pagseguro.webp`},
    {title: EPaymentName.PAYPAL, urlImage: `${this._pathImagesPayment}/paypal.webp`},
  ];
  readonly paymentMethods: PaymentMethod[] = [
    {
      urlImageMethod: `${this._pathImagesPayment}/methods/pagseguro.webp`,
      anothersOptions: this._anotherOptions
        .filter(opt => opt.title !== EPaymentName.MERCADO_PAGO
          && opt.title !== EPaymentName.PAYPAL
        ),
      cardOptions: this._cardOptions,
      title: 'PagSeguro'
    },
    {
      urlImageMethod: `${this._pathImagesPayment}/methods/mercado-pago.webp`,
      anothersOptions: this._anotherOptions
        .filter(opt => opt.title !== EPaymentName.PAGSEGURO
          && opt.title !== EPaymentName.PAYPAL
        ),
      cardOptions: this._cardOptions.filter(opt => opt.title !== EPaymentName.HIPER),
      title: 'Mercado pago'
    },
    {
      urlImageMethod: `${this._pathImagesPayment}/methods/paypal.webp`,
      anothersOptions: this._anotherOptions
        .filter(opt => opt.title === EPaymentName.PAYPAL),
      cardOptions: this._cardOptions.filter(opt => opt.title !== EPaymentName.DINERS),
      title: 'PayPal'
    },
  ];
  readonly routes = routesFrontend;
  products: Product[] = [];
  addressDelivery?: Address;
  methodChosen?: PaymentMethod;
  productsPreview: Product[] = [];
  productsPreviewTitle = '';

  constructor(
    private _productServ: ProductService,
    private _addressServ: AddressService
  ) {
    this._addressServ.getMain()
      .pipe(take(1))
      .subscribe((address?: Address) => this.addressDelivery = undefined);

    const prodIds: string[] = CartService.getProducts();

    // Se no carrinho houver ids de produtos, então busque eles no backend
    if (prodIds && prodIds.length) {
      this._productServ.get({ids: prodIds, countTotal: 0, currentPage: 1, perPage: 3})
        .pipe(take(1))
        .subscribe(prods => this.products = prods);
      this.productsPreview = this.products.slice(0, 3);
      this.productsPreviewTitle = this.productsPreview
        .map(p => p.title.split(' ').slice(0, 4).join(' '))
        .join(', ');
    }
  }

  selectPayMethod(paymentMethod: PaymentMethod) {
    this.methodChosen = paymentMethod;
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

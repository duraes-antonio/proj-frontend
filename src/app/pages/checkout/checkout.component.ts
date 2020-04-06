import {Component} from '@angular/core';
import {paths} from '../../../shared/constants/paths';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  private _pathImagesPayment = `${paths.assets}/payments`;
  private _cardOptions: PaymentMethodOption[] = [
    {title: EPaymentName.AMERICAN_EXPRESS, urlImage: `${this._pathImagesPayment}/american-express.png`},
    {title: EPaymentName.DINERS, urlImage: `${this._pathImagesPayment}/diners.png`},
    {title: EPaymentName.ELO, urlImage: `${this._pathImagesPayment}/elo.png`},
    {title: EPaymentName.HIPER, urlImage: `${this._pathImagesPayment}/hiper.png`},
    {title: EPaymentName.HIPERCARD, urlImage: `${this._pathImagesPayment}/hipercard.png`},
    {title: EPaymentName.MASTERCARD, urlImage: `${this._pathImagesPayment}/mastercard.png`},
    {title: EPaymentName.VISA, urlImage: `${this._pathImagesPayment}/visa.png`},
  ];
  private _anotherOptions: PaymentMethodOption[] = [
    {title: EPaymentName.BOLETO, urlImage: `${this._pathImagesPayment}/boleto.png`},
    {title: EPaymentName.MERCADO_PAGO, urlImage: `${this._pathImagesPayment}/mercado-pago.png`},
    {title: EPaymentName.PAGSEGURO, urlImage: `${this._pathImagesPayment}/pagseguro.png`},
    {title: EPaymentName.PAYPAL, urlImage: `${this._pathImagesPayment}/paypal.png`},
  ];
  paymentMethods: PaymentMethod[] = [
    {
      urlImageMethod: 'https://logodownload.org/wp-content/uploads/2016/09/pagseguro-logo.png',
      anothersOptions: this._anotherOptions
        .filter(opt => opt.title !== EPaymentName.MERCADO_PAGO
          && opt.title !== EPaymentName.PAYPAL
        ),
      cardOptions: this._cardOptions,
      title: 'PagSeguro'
    },
    {
      urlImageMethod: 'https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png',
      anothersOptions: this._anotherOptions
        .filter(opt => opt.title !== EPaymentName.PAGSEGURO
          && opt.title !== EPaymentName.PAYPAL
        ),
      cardOptions: this._cardOptions.filter(opt => opt.title !== EPaymentName.HIPER),
      title: 'Mercado pago'
    },
    {
      urlImageMethod: 'https://logodownload.org/wp-content/uploads/2014/10/paypal-logo-3.png',
      anothersOptions: this._anotherOptions
        .filter(opt => opt.title === EPaymentName.PAYPAL),
      cardOptions: this._cardOptions.filter(opt => opt.title !== EPaymentName.DINERS),
      title: 'PayPal'
    },
  ];
  methodChosen: PaymentMethod = this.paymentMethods[0];

  constructor() {
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

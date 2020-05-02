export interface PaymentMethodOption {
  readonly title: string;
  readonly urlImage: string;
}

export interface PaymentMethod {
  readonly options: PaymentMethodOption[];
  readonly title: string;
  readonly urlImageMethod: string;
}

export enum EPaymentName {
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

const getCardPaymentOptions = (pathDirPaymentsImages: string): PaymentMethodOption[] => {
  return [
    {title: EPaymentName.AMERICAN_EXPRESS, urlImage: `${pathDirPaymentsImages}/american-express.webp`},
    {title: EPaymentName.DINERS, urlImage: `${pathDirPaymentsImages}/diners.webp`},
    {title: EPaymentName.ELO, urlImage: `${pathDirPaymentsImages}/elo.webp`},
    {title: EPaymentName.HIPER, urlImage: `${pathDirPaymentsImages}/hiper.webp`},
    {title: EPaymentName.HIPERCARD, urlImage: `${pathDirPaymentsImages}/hipercard.webp`},
    {title: EPaymentName.MASTERCARD, urlImage: `${pathDirPaymentsImages}/mastercard.webp`},
    {title: EPaymentName.VISA, urlImage: `${pathDirPaymentsImages}/visa.webp`},
  ];
};

const getSecondaryPaymentOptions = (pathDirPaymentsImages: string): PaymentMethodOption[] => {
  return [
    {title: EPaymentName.BOLETO, urlImage: `${pathDirPaymentsImages}/boleto.webp`},
    {title: EPaymentName.MERCADO_PAGO, urlImage: `${pathDirPaymentsImages}/mercado-pago.webp`},
    {title: EPaymentName.PAGSEGURO, urlImage: `${pathDirPaymentsImages}/pagseguro.webp`},
    {title: EPaymentName.PAYPAL, urlImage: `${pathDirPaymentsImages}/paypal.webp`},
  ];
};

export const getPaymentMethods = (pathDirPaymentsImages: string): PaymentMethod[] => {
  const anotherOptions = getSecondaryPaymentOptions(pathDirPaymentsImages);
  const cardOptions = getCardPaymentOptions(pathDirPaymentsImages);
  return [
    {
      urlImageMethod: `${pathDirPaymentsImages}/methods/pagseguro.webp`,
      options: [
        ...cardOptions,
        ...anotherOptions
          .filter(opt => opt.title !== EPaymentName.MERCADO_PAGO
            && opt.title !== EPaymentName.PAYPAL
          )
      ],
      title: 'PagSeguro'
    },
    {
      urlImageMethod: `${pathDirPaymentsImages}/methods/mercado-pago.webp`,
      options: [
        ...cardOptions.filter(opt => opt.title !== EPaymentName.HIPER),
        ...anotherOptions
          .filter(opt => opt.title !== EPaymentName.PAGSEGURO
            && opt.title !== EPaymentName.PAYPAL
          )
      ],
      title: 'Mercado pago'
    },
    {
      urlImageMethod: `${pathDirPaymentsImages}/methods/paypal.webp`,
      options: [
        ...cardOptions.filter(opt => opt.title !== EPaymentName.DINERS),
        ...anotherOptions.filter(opt => opt.title === EPaymentName.PAYPAL)
      ],
      title: 'PayPal'
    },
  ];
};

import {IClientAuthorizeCallbackData, ICreateOrderRequest, IOnClickCallbackActions, IPayPalConfig} from 'ngx-paypal';

// TODO: Passar os items de pedido como parametro
export const getPaypalConfig = (callbacks: PaypalCallbacks): IPayPalConfig => {
  return {
    currency: 'BRL',
    clientId: 'AXg0OUZI4L1NOOWjPyQM-WRBA-gmkNJU4dn0ZZKDbgZ08UF-DaqIQbv0afTG5NrrEW15GmAx94nXuqeo',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'BRL',
          value: '9.99',
          breakdown: {
            item_total: {
              currency_code: 'BRL',
              value: '9.99'
            }
          }
        },
        items: [
          {
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'BRL',
              value: '9.99',
            },
          }]
      }]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      shape: 'pill',
      color: 'gold',
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      callbacks.onApprove(data, actions);
      console.log(data);
    },
    onClientAuthorization: (data) => callbacks.onClientAuthorization(data),
    onCancel: callbacks?.onCancel,
    onError: callbacks?.onError,
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
};

export const paymentConfig = {
  getPaypalConfig
};

export interface PaypalCallbacks {
  readonly onApprove: (data: any, actions: IOnClickCallbackActions) => any;
  readonly onClientAuthorization: (actions: IClientAuthorizeCallbackData) => any;
  readonly onCancel?: (data: any, actions: IOnClickCallbackActions) => any;
  readonly onError?: (err: Error) => any;
  readonly onClick?: (data: any, actions: IOnClickCallbackActions) => any;
}

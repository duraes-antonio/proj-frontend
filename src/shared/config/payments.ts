import {IClientAuthorizeCallbackData, IOnClickCallbackActions, IPayPalConfig} from 'ngx-paypal';
import {OrderAdd} from '../../app/models/order';

// TODO: Passar os items de pedido como parametro
// TODO: Mover clientId p/ heroku
export const getPaypalConfig = (callbacks: PaypalCallbacks): IPayPalConfig => {
  return {
    currency: 'BRL',
    clientId: 'AXg0OUZI4L1NOOWjPyQM-WRBA-gmkNJU4dn0ZZKDbgZ08UF-DaqIQbv0afTG5NrrEW15GmAx94nXuqeo',
    createOrderOnServer: callbacks.createOrderOnServer,
    advanced: {
      commit: 'true'
    },
    style: {
      shape: 'pill',
      color: 'gold',
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: callbacks.onApprove,
    onClientAuthorization: callbacks?.onClientAuthorization,
    onCancel: callbacks?.onCancel,
    onError: callbacks?.onError,
    onClick: callbacks?.onClick,

  };
};

export const paymentConfig = {
  getPaypalConfig
};

export interface PaypalCallbacks {
  readonly createOrderOnServer: (data: OrderAdd) => Promise<string>;
  readonly onApprove: (data: any, actions: IOnClickCallbackActions) => any;
  readonly onClientAuthorization?: (actions: IClientAuthorizeCallbackData) => any;
  readonly onCancel?: (data: any, actions: IOnClickCallbackActions) => any;
  readonly onError?: (err: Error) => any;
  readonly onClick?: (data: any, actions: IOnClickCallbackActions) => any;
}

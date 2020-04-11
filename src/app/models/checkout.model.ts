'use strict';
export interface CheckoutModel {
  addressId?: string;
  productsIdQuantity: {productId: string, quantity: number}[];
}

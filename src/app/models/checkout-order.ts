'use strict';
export interface CheckoutOrder {
  addressId?: string;
  productsIdQuantity: { productId: string; quantity: number }[];
}

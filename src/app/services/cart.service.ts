'use strict';

import {CheckoutOrder} from '../models/checkout-order';
import {Product} from '../models/product';

export class CartService {

  static saveOrder(productsQuantity: [Product, number][], addressId?: string) {
    if (productsQuantity.length) {
      const checkoutObj: CheckoutOrder = {
        addressTargetId: addressId ?? undefined,
        items: productsQuantity
          .map((pair: [Product, number]) => {
            return {
              productId: pair[0].id,
              quantity: pair[1],
              unitPrice: pair[0].priceWithDiscount
            };
          })
      };
      localStorage.setItem('order', JSON.stringify(checkoutObj));
    }
  }

  static getOrder(): CheckoutOrder | undefined {
    const order = window.localStorage.getItem('order');
    return order ? JSON.parse(order) : undefined;
  }

  static addProducts(prodId: number): void {
    const cartFromStorage = window.localStorage.getItem('cart');

    /*Se não houver a variável de carrinho no localstore, crie-a*/
    if (!cartFromStorage) {
      window.localStorage.setItem('cart', JSON.stringify([prodId]));
    } else {
      /*Se houver, verifique se o produto está contido nela*/
      const cartJsonStr: number[] = JSON.parse(cartFromStorage);

      if (!cartJsonStr.some(pId => pId === prodId)) {
        window.localStorage.setItem('cart', JSON.stringify([...cartJsonStr, prodId]));
      }
    }
  }

  static getProducts(): string[] {
    const cartFromStorage = window.localStorage.getItem('cart');
    return !cartFromStorage ? [] : JSON.parse(cartFromStorage);
  }

  static containsProduct(productId: string): boolean {
    const prods = window.localStorage.getItem('cart');
    return !prods || (JSON.parse(prods) as string[]).indexOf(productId) > -1;
  }

  static removeProduct(id: string) {
    const prods = window.localStorage.getItem('cart');

    if (prods) {
      window.localStorage.setItem(
        'cart',
        JSON.stringify(
          (JSON.parse(prods) as string[]).filter(pId => pId !== id)
        )
      );
    }
  }

  static clear() {
    window.localStorage.removeItem('cart');
  }
}

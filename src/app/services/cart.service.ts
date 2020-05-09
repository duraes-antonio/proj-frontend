'use strict';
import {CheckoutOrder} from '../models/checkout-order';
import {Product} from '../models/product';
import {BehaviorSubject} from 'rxjs';

export class CartService {
  private static readonly _productIds = new BehaviorSubject<string[]>(CartService._getFromStorage());
  static readonly productIds$ = CartService._productIds.asObservable();

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

  static removeOrder() {
    window.localStorage.removeItem('order');
  }


  static addProducts(prodId: string) {
    const prods = CartService.getProducts();
    if (!prods.some(productId => productId === prodId)) {
      const newProductIds = [...prods, prodId];
      window.localStorage.setItem('cart', JSON.stringify(newProductIds));
      CartService._productIds.next(newProductIds);
    }
  }

  static getProducts(): string[] {
    return CartService._productIds.getValue();
  }

  static containsProduct(productId: string): boolean {
    return CartService.getProducts().indexOf(productId) > -1;
  }

  static removeProduct(id: string) {
    const prods = CartService.getProducts();
    if (prods.length) {
      const newProductIds = prods.filter(pId => pId !== id);
      window.localStorage.setItem('cart', JSON.stringify(newProductIds));
      CartService._productIds.next(newProductIds);
    }
  }

  static clear() {
    window.localStorage.removeItem('cart');
    CartService._productIds.next([]);
  }

  private static _getFromStorage(): string[] {
    const cartFromStorage = window.localStorage.getItem('cart');
    return !cartFromStorage ? [] : JSON.parse(cartFromStorage);
  }
}

'use strict';

export class CartService {

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

  static getProducts(): number[] {
    const cartFromStorage = window.localStorage.getItem('cart');
    return !cartFromStorage ? [] : JSON.parse(cartFromStorage);
  }

  static containsProduct(productId: number): boolean {
    const prods = window.localStorage.getItem('cart');
    return !prods || (JSON.parse(prods) as number[]).indexOf(productId) > -1;
  }

  static removeProduct(id: number) {
    const prods = window.localStorage.getItem('cart');

    if (prods) {
      window.localStorage.setItem(
        'cart',
        JSON.stringify(
          (JSON.parse(prods) as number[]).filter(pId => pId !== id)
        )
      );
    }
  }

  static clear() {
    window.localStorage.removeItem('cart');
  }
}

import {ProductIdAmount} from '../modelos/cart.model';

export class CartService {

  public static addProducts(prods: { amount: number, id: string }[]): void {
    const cartJsonStr = JSON.parse(window.localStorage.getItem('cart'));

    if (cartJsonStr) {
      const products: ProductIdAmount[] = JSON.parse(cartJsonStr);
      window.localStorage.setItem('cart', JSON.stringify(prods));
    }
  }

  public static getProducts(): { amount: number, id: string }[] {
    return JSON.parse(window.localStorage.getItem('cart'));
  }
}

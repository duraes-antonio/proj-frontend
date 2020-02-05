export class CartService {

  public static addProducts(prodId: number): void {
    const cartJsonStr: number[] = JSON.parse(window.localStorage.getItem('cart'));

    if (!cartJsonStr) {
      window.localStorage.setItem('cart', JSON.stringify([prodId]));
    } else if (!(cartJsonStr as number[]).some(pId => pId === prodId)) {
      window.localStorage.setItem('cart', JSON.stringify([...cartJsonStr, prodId]));
    }
  }

  public static getProducts(): number[] {
    return JSON.parse(window.localStorage.getItem('cart'));
  }

  public static containsProduct(productId): boolean {
    const prods = window.localStorage.getItem('cart');
    return !prods || (JSON.parse(prods) as number[]).indexOf(productId) > -1;
  }

  public static removeProduct(id: number) {
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

  public static clear() {
    window.localStorage.removeItem('cart');
  }
}

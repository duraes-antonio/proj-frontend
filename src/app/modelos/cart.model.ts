'use strict';

export class Cart {
  public readonly prodIdAmount: ProductIdAmount[] = [];
}

export class ProductIdAmount {
  public readonly amount: number;
  public readonly id: string;
}

'use strict';

export interface ItemOrderAdd {
  readonly amount: number;
  readonly unitPrice: number;
  readonly productId: string;
}

export interface ItemOrder extends ItemOrderAdd {
  readonly id: string;
}

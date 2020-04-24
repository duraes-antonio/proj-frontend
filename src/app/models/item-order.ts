'use strict';

import {Product} from './product';

export interface ItemOrderAdd {
  readonly quantity: number;
  readonly unitPrice: number;
  readonly productId: string;
}

export interface ItemOrder extends ItemOrderAdd {
  readonly id: string;
  readonly product?: Product;
}

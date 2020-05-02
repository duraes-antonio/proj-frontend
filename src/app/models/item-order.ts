'use strict';

import {Product} from './product';
import {ItemShipping} from './shipping/delivery';

export interface ItemOrderAdd extends ItemShipping {
  readonly unitPrice: number;
}

export interface ItemOrder extends ItemOrderAdd {
  readonly id: string;
  readonly product?: Product;
}

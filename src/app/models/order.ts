'use strict';
import {ItemOrder, ItemOrderAdd} from './item-order';
import {EStateOrder} from '../enum/state-order';

export interface OrderAdd {
  readonly items: ItemOrderAdd[];
  readonly date: Date;
  readonly state: EStateOrder;

  readonly daysForDelivery: number;
  readonly addressTargetId: string;
}

export interface Order extends OrderAdd {
  readonly id: string;
  readonly costDelivery: number;
  readonly costItems: number;
  readonly dateDelivery?: Date;
  readonly items: ItemOrder[];
}

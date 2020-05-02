'use strict';
import {ItemOrder, ItemOrderAdd} from './item-order';
import {EStateOrder} from '../enum/state-order';
import {DeliveryOptionType} from './shipping/delivery';

export interface OrderAdd {
  readonly addressTargetId: string;
  readonly items: ItemOrderAdd[];
  readonly optionDeliveryType: DeliveryOptionType;
}

export interface Order extends OrderAdd {
  readonly id: string;
  readonly costDelivery: number;
  readonly costItems: number;
  readonly date: Date;
  readonly dateDelivery?: Date;
  readonly daysForDelivery: number;
  readonly items: ItemOrder[];
  readonly state: EStateOrder;
  readonly userId: string;
}

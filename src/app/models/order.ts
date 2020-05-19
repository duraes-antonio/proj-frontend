'use strict';
import {ItemOrder, ItemOrderAdd} from './item-order';
import {OrderOptionsSort, OrderStatus, PaymentStatus} from '../enum/order';
import {DeliveryOptionType} from './shipping/delivery';
import {FilterBasic} from './filters/filter-basic';
import {EntitySaved} from './entity-saved';

export interface OrderAdd {
  readonly addressTargetId: string;
  readonly items: ItemOrderAdd[];
  readonly optionDeliveryType: DeliveryOptionType;
}

export interface Order extends OrderAdd, EntitySaved {
  readonly costDelivery: number;
  readonly costItems: number;
  readonly date: Date;
  readonly dateDelivery?: Date;
  readonly daysForDelivery: number;
  readonly items: ItemOrder[];
  readonly paymentStatus: PaymentStatus;
  readonly state: OrderStatus;
  readonly userId: string;
}

export interface OrderForView extends EntitySaved {
  customerName: string;
  customerUrlImg: string;
  costItems: number;
  costShipping: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
}

export interface OrderFilterFilled extends FilterBasic {
  count: number;
  result: OrderForView[];
  sortBy?: OrderOptionsSort;
}


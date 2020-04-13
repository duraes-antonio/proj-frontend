'use strict';
import {Address} from './address';
import {ItemOrder} from './item-order';
import {EStateOrder} from '../enum/state-order';
import {DeliveryOption} from './delivery-option';

export class Order {
  readonly id: number;
  readonly items: ItemOrder[];
  readonly date: Date;
  readonly state: EStateOrder;

  readonly costDelivery: number;
  readonly daysForDelivery: number;
  readonly addressTarget: Address;
  readonly dateDelivery?: Date;

  constructor(
    id = 0, items: ItemOrder[], state: EStateOrder,
    delivery: DeliveryOption, address: Address, date?: Date, dateDelivery?: Date
  ) {
    this.id = id;
    this.items = items;
    this.date = date ?? new Date();
    this.state = state;
    this.costDelivery = delivery.cost;
    this.daysForDelivery = delivery.timeDays;
    this.addressTarget = address;
    this.dateDelivery = dateDelivery;
  }
}

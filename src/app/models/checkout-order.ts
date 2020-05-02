'use strict';
import {ItemOrderAdd} from './item-order';
import {DeliveryOptionType} from './shipping/delivery';

export interface CheckoutOrder {
  addressTargetId?: string;
  optionDeliveryType?: DeliveryOptionType;
  items: ItemOrderAdd[];
}

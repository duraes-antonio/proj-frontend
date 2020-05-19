'use strict';
import {FilterBasic} from './filter-basic';
import {OrderOptionsSort, OrderStatus, PaymentStatus} from '../../enum/order';

export interface FilterOrder extends FilterBasic {
  clientName?: string;
  dateEnd?: Date;
  dateStart?: Date;
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
  sortBy?: OrderOptionsSort;
}

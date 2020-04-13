'use strict';
import {FilterBasic} from './filter-base';

export interface FilterReview extends FilterBasic {
  currentPage: number;
  perPage: number;
  productId: string;
  userId?: string;
  dateEnd?: Date;
  dateStart?: Date;
}

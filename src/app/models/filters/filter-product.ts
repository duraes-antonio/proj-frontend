'use strict';
import {FilterBasic} from './filter-basic';
import {EProductSort} from '../../enum/product-sort';
import {Product} from '../product';
import {Category} from '../category';

export interface FilterProduct extends FilterBasic {
  avgReview?: number[];
  categoriesId?: string[];
  discounts?: [number, number][];
  freeDelivery?: boolean;
  ids?: string[];
  priceMax?: number;
  priceMin?: number;
  text?: string;
  sortBy?: EProductSort;
}

export interface FilterProductResponse extends FilterBasic {
  avgReview: number[];
  categories: Category[];
  categoriesId: string[];
  discounts: [number, number][];
  freeDelivery: boolean;
  priceMax: number;
  priceMin: number;
  text?: string;
  sortBy?: EProductSort;
  result: Product[];
}

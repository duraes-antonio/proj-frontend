'use strict';
import {EntitySaved} from './entity-saved';
import {ECategorySort} from '../enum/category-sort';
import {FilterBasic} from './filters/filter-basic';

export interface CategoryAdd {
  readonly title: string;
}

export interface Category extends CategoryAdd, EntitySaved {
}

export interface CategoryForView extends Category {
  productsQuantity: number;
  productPreview?: CategoryProductPreview[];
}

export interface CategoryProductPreview {
  readonly title: string;
  readonly urlImage?: string;
}

export interface CategoryFilterFilled extends FilterBasic {
  count: number;
  result: CategoryForView[];
  sortBy?: ECategorySort;
  text?: string;
}

'use strict';
import {Category} from './category';

export interface ProductAdd {
  readonly quantity: number;
  readonly categoriesId: string[];
  readonly desc: string;
  readonly freeDelivery: boolean;
  readonly percentOff: number;
  readonly price: number;
  readonly title: string;
  readonly urlMainImage?: string;
  readonly cost: number;
  readonly height: number;
  readonly width: number;
  readonly length: number;
  readonly weight: number;
  readonly visible: boolean;
}

export interface Product extends ProductAdd {
  readonly id: string;
  readonly urlImage?: string;
  readonly priceWithDiscount: number;
  readonly categories: Category[];
  readonly avgReview: number;
}

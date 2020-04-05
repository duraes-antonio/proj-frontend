'use strict';
import {Category} from './category';

export class Product implements ProductAdd {

  id: string;
  title: string;
  desc: string;
  urlImage?: string;

  price = 0;
  priceWithDiscount = 0;
  percentOff = 0;

  freeDelivery = false;
  categories: Category[] = [];
  categoriesId: string[] = [];
  avgReview = 0;
  amountAvailable = 0;

  cost = 0;
  height = 0;
  width = 0;
  length = 0;
  weight = 0;
  visible = false;

  constructor(
    title: string, desc: string, priceSell: number, urlImg?: string,
    percOff?: number, categories?: Category[], freeDelivery?: boolean,
    id?: number, amountAvailable?: number, avgReview?: number
  ) {
    this.title = title;
    this.desc = desc;
    this.price = priceSell;
    this.urlImage = urlImg ? urlImg : this.urlImage;
    this.freeDelivery = !!freeDelivery ? freeDelivery : false;
    this.percentOff = percOff ? percOff : this.percentOff;
    this.priceWithDiscount = this.percentOff > 0 ? this.price * (100 - this.percentOff) / 100 : this.price;
    this.categories = categories ? categories : [];
    this.id = id ? id.toString() : '1';
    this.amountAvailable = amountAvailable ? amountAvailable : this.amountAvailable;
    this.avgReview = avgReview ? avgReview : this.avgReview;
  }
}

export interface ProductAdd {
  readonly amountAvailable: number;
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
}

'use strict';
export interface CardAdd {
  readonly title: string;
  readonly desc?: string;
  readonly btnTitle?: string;
  readonly urlAction: string;
  readonly urlImage: string;
}

export interface Card extends CardAdd {
  readonly id: string;
}

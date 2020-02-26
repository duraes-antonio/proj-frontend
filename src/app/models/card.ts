'use strict';

export class Card {

  readonly title?: string;
  readonly desc?: string;
  readonly btnTitle?: string;
  readonly urlAction: string;
  readonly urlImage: string;
  readonly id: number;

  constructor(
    id: number, urlImg: string, urlAction: string, title?: string,
    desc?: string, btnTitle?: string
  ) {
    this.id = id;
    this.urlImage = urlImg;
    this.urlAction = urlAction;

    this.title = title;
    this.desc = desc;
    this.btnTitle = btnTitle;
  }

}

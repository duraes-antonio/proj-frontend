'use strict';

export class Slide {
  readonly btnTitle?: string;
  readonly desc?: string;
  readonly id: number;
  readonly imageUrl: string;
  readonly index: number;
  readonly sliderId: number;
  readonly title?: string;
  readonly url: string;

  constructor(
    id: number, idSlider: number, index: number, imgUrl: string, url: string,
    title?: string, desc?: string, btnTitle?: string) {
    this.id = id;
    this.sliderId = idSlider;
    this.index = index;
    this.imageUrl = imgUrl;
    this.url = url;
    this.title = title;
    this.desc = desc;
    this.btnTitle = btnTitle;
  }
}

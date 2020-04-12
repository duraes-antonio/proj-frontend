'use strict';

export class Link {
  text: string;
  url: string;

  constructor(text: string, url: string) {
    this.url = url;
    this.text = text;
  }
}

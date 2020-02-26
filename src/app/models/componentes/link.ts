'use strict';

export class Link {
  public text: string;
  public url: string;

  constructor(text: string, url: string) {
    this.url = url;
    this.text = text;
  }
}

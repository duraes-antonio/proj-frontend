'use strict';
export interface MarketAdd {
  readonly imageUrl: string;
  readonly logoImgUrl: string;
  readonly name: string;
  readonly url: string;
}

export interface Market extends MarketAdd {
  readonly id: string;
}

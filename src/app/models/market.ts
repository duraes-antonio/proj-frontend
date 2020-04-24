'use strict';
export interface MarketAdd {
  readonly backgroundUrl: string;
  readonly avatarUrl: string;
  readonly name: string;
  readonly url: string;
}

export interface Market extends MarketAdd {
  readonly id: string;
}

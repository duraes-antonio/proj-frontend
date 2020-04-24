'use strict';

export enum DeliveryOptionType {
  PAC = 'PAC',
  SEDEX = 'SEDEX'
}

export interface DeliveryOption {
  readonly cost: number;
  readonly timeDays: number;
  readonly typeService: DeliveryOptionType;
}

export interface ItemShipping {
  readonly quantity: number;
  readonly productId: string;
}

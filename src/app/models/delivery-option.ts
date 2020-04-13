'use strict';

export class DeliveryOption {
  readonly cost: number;
  readonly timeDays: number;

  constructor(cost: number, time: number) {
    this.cost = cost;
    this.timeDays = time;
  }
}

'use strict';
import {TypeComponent} from '../../enum/type-component';
import {Market} from '../market';
import {ASequence} from '../../interfaces/sequence';

export class ListMarket extends ASequence<Market> {

  constructor(title: string, items: Market[], id = 0) {
    super(TypeComponent.LIST_MARKET, title, items, id);
  }
}

'use strict';
import {Market, MarketAdd} from './market';
import {Sequence, SequenceAdd} from './sequence';

export interface ListMarketAdd extends SequenceAdd<MarketAdd> {
}

export interface ListMarket extends Sequence<Market> {
}

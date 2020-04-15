'use strict';
import {Product, ProductAdd} from '../product';
import {Sequence, SequenceAdd} from './sequence';

export interface ListProductAdd extends SequenceAdd<ProductAdd> {
}

export interface ListProduct extends Sequence<Product> {
}

'use strict';
import {TypeComponent} from '../../enum/typeComponent';
import {Product} from '../product';
import {ASequence} from '../../interfaces/sequence';

export class ListProduct extends ASequence<Product> {

  constructor(title: string, items: Product[], id = 0) {
    super(TypeComponent.LIST_PRODUCT, title, items, id);
  }
}

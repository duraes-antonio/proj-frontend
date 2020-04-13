'use strict';
import {TypeComponent} from '../../enum/type-component';
import {Card} from '../card';
import {ASequence} from '../../interfaces/sequence';

export class ListCard extends ASequence<Card> {

  // TODO: Solicitar ao backend a sequencia de id atual
  constructor(title: string, items: Card[], id = 0) {
    super(TypeComponent.LIST_CARD, title, items, id);
  }
}

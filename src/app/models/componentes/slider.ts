'use strict';
import {Slide} from './slide';
import {TypeComponent} from '../../enum/type-component';
import {ASequence} from '../../interfaces/sequence';

export class Slider extends ASequence<Slide> {

  constructor(id: number, items: Slide[], title = '') {
    super(TypeComponent.SLIDER, title, items, id);
  }
}

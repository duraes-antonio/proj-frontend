'use strict';
import {TypeComponent} from '../enum/typeComponent';

export interface ISequence<T> {
  readonly id: number;
  readonly type: TypeComponent;
  readonly items: T[];
  readonly title: string;
  readonly lenght: number;
}

export abstract class ASequence<T> implements ISequence<T> {
  readonly id: number;
  readonly title: string;
  readonly type: TypeComponent = TypeComponent.UNKNOWN;
  items: T[] = [];

  constructor(type: TypeComponent, title: string, items: T[] = [], id = 0,) {
    this.id = id;
    this.title = title;
    this.items = items;
    this.type = type;
  }

  get lenght(): number {
    return this.items ? this.items.length : 0;
  }
}

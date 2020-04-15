'use strict';
import {ERole} from '../../enum/roles';

export interface SequenceAdd<T> {
  readonly items: T[];
  readonly title: string;
  readonly readRole: ERole;
}

export interface Sequence<T> extends SequenceAdd<T> {
  readonly id: string;
}

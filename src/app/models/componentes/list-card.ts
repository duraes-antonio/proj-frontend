'use strict';
import {Card, CardAdd} from '../card';
import {Sequence, SequenceAdd} from './sequence';

export interface ListCardAdd extends SequenceAdd<CardAdd> {}
export interface ListCard extends Sequence<Card> {}

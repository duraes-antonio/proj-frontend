'use strict';
import {Sequence, SequenceAdd} from './sequence';
import {Slide, SlideAdd} from './slide';

export interface ListSlideAdd extends SequenceAdd<SlideAdd> {
}

export interface ListSlide extends Sequence<Slide> {
}

'use strict';

export interface SlideBase {
  readonly index: number;
  readonly title: string;
  readonly url: string;
}

export interface Slide extends SlideBase {
  readonly id: string;
  readonly imageUrl?: string;
}

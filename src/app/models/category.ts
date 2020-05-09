'use strict';
export interface CategoryAdd {
  readonly title: string;
}

export interface Category extends CategoryAdd {
  readonly id: string;
}

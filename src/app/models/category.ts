'use strict';
export interface CategoryAdd {
  readonly name: string;
}

export interface Category extends CategoryAdd {
  readonly id: string;
}

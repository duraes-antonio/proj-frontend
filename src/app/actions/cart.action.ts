'use strict';
import {Action} from '@ngrx/store';

export enum CartActionType {
  ADD = 'ADD',
  REMOVE = 'REM',
  CLEAR = 'CLE'
}

export const Add = (productId: number): Action => {
  return {type: CartActionType.ADD, payload: productId} as Action;
};

export const Remove = (productId: number): Action => {
  return {type: CartActionType.REMOVE, payload: productId} as Action;
};

export const Clear = (): Action => {
  return {type: CartActionType.CLEAR} as Action;
};

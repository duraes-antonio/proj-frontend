'use strict';
import {Action} from '@ngrx/store';

export enum CartActionType {
  ADD = 'ADD',
  REMOVE = 'REM',
  CLEAR = 'CLE'
}

export const Add = (productId: number) => {
  return <Action>{type: CartActionType.ADD, payload: productId};
};

export const Remove = (productId: number) => {
  return <Action>{type: CartActionType.REMOVE, payload: productId};
};

export const Clear = () => {
  return <Action>{type: CartActionType.CLEAR};
};

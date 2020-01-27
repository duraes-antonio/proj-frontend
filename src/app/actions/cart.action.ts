'use strict';
import {Action} from '@ngrx/store';
import {ProductIdAmount} from '../modelos/cart.model';

export enum CartActionType {
  ADD = 'ADD',
  REMOVE = 'REM',
  CLEAR = 'CLE'
}

export const Add = (pairIdAmount: ProductIdAmount) => {
  return <Action>{type: CartActionType.ADD, payload: pairIdAmount};
};

export const Remove = (pairIdAmount: ProductIdAmount) => {
  return <Action>{type: CartActionType.REMOVE, payload: pairIdAmount};
};

export const Clear = () => {
  return <Action>{type: CartActionType.CLEAR};
};

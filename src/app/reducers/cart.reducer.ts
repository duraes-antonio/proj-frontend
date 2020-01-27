'use strict';
import {CartActionType} from '../actions/cart.action';
import {Cart} from '../modelos/cart.model';
import {ActionModel} from '../modelos/action.model';

export const cart = new Cart();

export const cartReducer = function cartRed(state = cart, action: ActionModel): Cart {
  debugger;
  switch (action.type) {
    case CartActionType.ADD: {
      state.prodIdAmount.push(action.payload);
      return state;
    }

    case CartActionType.REMOVE: {
      const index = state.prodIdAmount.indexOf(action.payload);
      state.prodIdAmount.splice(index, 1);
      return state;
    }

    case CartActionType.CLEAR: {
      return new Cart();
    }

    default:
      return state;
  }
};

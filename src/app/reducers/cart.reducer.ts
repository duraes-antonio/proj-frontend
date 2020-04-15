'use strict';
import {CartActionType} from '../actions/cart.action';
import {Cart} from '../models/cart';
import {ActionModel} from '../models/action';
import {CartService} from '../services/cart.service';
import {Action} from '@ngrx/store';

export const cart = {productsId: CartService.getProducts()};

export function cartReducer(state = cart, action: Action): Cart {
  const castAction = action as ActionModel;
  switch (action.type) {
    case CartActionType.ADD: {
      if (state.productsId && state.productsId.some(id => id === castAction.payload)) {
        return state;
      } else {
        CartService.addProducts(castAction.payload);
        return {productsId: [...state.productsId, castAction.payload]};
      }
    }

    case CartActionType.REMOVE: {
      CartService.removeProduct(castAction.payload);
      return {productsId: state.productsId.filter(id => id !== castAction.payload)};
    }

    case CartActionType.CLEAR: {
      CartService.clear();
      return {productsId: []};
    }

    default:
      return state;
  }
}

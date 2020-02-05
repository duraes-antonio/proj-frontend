'use strict';
import {CartActionType} from '../actions/cart.action';
import {Cart} from '../models/cart.model';
import {ActionModel} from '../models/action.model';
import {CartService} from '../services/cart.service';

export const cart = {productsId: CartService.getProducts()};

export const cartReducer = function cartRed(state = cart, action: ActionModel): Cart {
  switch (action.type) {
    case CartActionType.ADD: {
      if (state.productsId && state.productsId.some(id => id === action.payload)) {
        return state;
      } else {
        CartService.addProducts(action.payload);
        return {productsId: [...state.productsId, action.payload]};
      }
    }

    case CartActionType.REMOVE: {
      CartService.removeProduct(action.payload);
      return {productsId: state.productsId.filter(id => id !== action.payload)};
    }

    case CartActionType.CLEAR: {
      CartService.clear();
      return new Cart();
    }

    default:
      return state;
  }
};

import { Action, createReducer, on } from '@ngrx/store';

import { ProductsState, initialProductsState } from './products.state';
import * as TasksActions from './products.actions';

const reducer = createReducer(
  initialProductsState,

  // GET PRODUCTS
  on(TasksActions.getProducts, state => {
    console.log('GET_PRODUCTS action being handled!');
    return { ...state };
  }),

  // GET PRODUCT
  on(TasksActions.getProduct, state => {
    console.log('GET_PRODUCT action being handled!');
    return { ...state };
  }),

  // CREATE PRODUCT
  on(TasksActions.createProduct, state => {
    console.log('CREATE_PRODUCT action being handled!');
    return { ...state };
  }),

  // UPDATE PRODUCT
  on(TasksActions.updateProduct, state => {
    console.log('UPDATE_PRODUCT action being handled!');
    return { ...state };
  }),

  // DELETE PRODUCT
  on(TasksActions.deleteProduct, state => {
    console.log('DELETE_PRODUCT action being handled!');
    return { ...state };
  })
);

export function productsReducer(state: ProductsState | undefined, action: Action) {
  return reducer(state, action);
}

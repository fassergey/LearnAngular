import { Action, createReducer, on } from '@ngrx/store';

import { ProductsState, initialProductsState } from './products.state';
import * as ProductsActions from './products.actions';

const reducer = createReducer(
  initialProductsState,

  // GET PRODUCTS
  on(ProductsActions.getProducts, state => {
    console.log('GET_PRODUCTS action being handled!');
    return {
      ...state,
      loading: true
    };
  }),
  on(ProductsActions.getProductsSuccess, (state, { products }) => {
    console.log('GET_PRODUCTS_SUCCESS action being handled!');
    const data = [...products];
    return {
      ...state,
      data,
      loading: false,
      loaded: true
    };
  }),
  on(
    ProductsActions.getProductsError,
    ProductsActions.getProductError,
    (state, { error }) => {
    console.log('GET_PRODUCTS/PRODUCT_ERROR action being handled!');
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),

  // GET PRODUCT
  on(ProductsActions.getProduct, state => {
    console.log('GET_PRODUCT action being handled!');
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),
  on(ProductsActions.getProductSuccess, (state, { product }) => {
    console.log('GET_PRODUCT action being handled!');
    const selectedProduct = { ...product };
    return {
      ...state,
      loading: false,
      loaded: true,
      selectedProduct
    };
  }),

  // CREATE PRODUCT
  on(ProductsActions.createProduct, state => {
    console.log('CREATE_PRODUCT action being handled!');
    return { ...state };
  }),

  // UPDATE PRODUCT
  on(ProductsActions.updateProduct, state => {
    console.log('UPDATE_PRODUCT action being handled!');
    return { ...state };
  }),

  // DELETE PRODUCT
  on(ProductsActions.deleteProduct, state => {
    console.log('DELETE_PRODUCT action being handled!');
    return { ...state };
  })
);

export function productsReducer(state: ProductsState | undefined, action: Action) {
  return reducer(state, action);
}

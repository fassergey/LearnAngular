import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/models/product';

export const getProducts = createAction(
  '[Product List Page (App)] GET_PRODUCTS'
);

export const getProduct = createAction(
  '[Product List Page] GET_PRODUCT',
  props<{ productID: number }>()

);

export const createProduct = createAction(
  '[Product Form Page] CREATE_PRODUCT',
  props<{ productID: number }>()
);

export const updateProduct = createAction(
  '[Product Form Page] UPDATE_PRODUCT',
  props<{ product: IProduct }>()
);

export const deleteProduct = createAction(
  '[Product List Page] DELETE_PRODUCT',
  props<{ product: IProduct }>()
);

import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/models/product';

// GET PRODUCTS
export const getProducts = createAction(
  '[Product List Page (App)] GET_PRODUCTS'
);
export const getProductsSuccess = createAction(
  '[Get Products Effect] GET_PRODUCTS_SUCCEESS',
  props<{ products: IProduct[] }>()
);
export const getProductsError = createAction(
  '[Get Products Effect] GET_PRODUCTS_ERROR',
  props<{ error: Error | string }>()
);

// GET PRODUCT
export const getProduct = createAction(
  '[Product List Page] GET_PRODUCT',
  props<{ productID: number }>()

);
export const getProductSuccess = createAction(
  '[Get Product Effect] GET_PRODUCT_SUCCESS',
  props<{ product: IProduct }>()
);
export const getProductError = createAction(
  '[Get Product Effect] GET_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

// CREATE PRODUCT
export const createProduct = createAction(
  '[Product Form Page] CREATE_PRODUCT',
  props<{ product: IProduct }>()
);
export const createProductSuccess = createAction(
  '[Create Product Effect] CREATE_PRODUCT_SUCCESS',
  props<{ product: IProduct }>()
);
export const createProductError = createAction(
  '[Create Product Effect] CREATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

// UPDATE PRODUCT
export const updateProduct = createAction(
  '[Product Form Page] UPDATE_PRODUCT',
  props<{ product: IProduct }>()
);
export const updateProductSuccess = createAction(
  '[Update Product Effect] UPDATE_PRODUCT_SUCCESS',
  props<{ product: IProduct }>()
);
export const updateProductError = createAction(
  '[Update Product Effect] UPDATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

// DELETE PRODUCT
export const deleteProduct = createAction(
  '[Product List Page] DELETE_PRODUCT',
  props<{ product: IProduct }>()
);

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAppState } from '../app.state';
import { ProductsState } from './products.state';
import { ProductModel } from 'src/app/shared/models/product';
import { selectRouterState } from './../router/router.selectors';

const selectData = (state: ProductsState) => state.data;
const selectLoaded = (state: ProductsState) => state.loaded;
const selectLoading = (state: ProductsState) => state.loading;
const selectError = (state: ProductsState) => state.error;

export const selectProductsState = createFeatureSelector<IAppState, ProductsState>('products');

export const selectProductsData = createSelector(
  selectProductsState,
  selectData
);
export const selectProductsLoaded = createSelector(
  selectProductsState,
  selectLoaded
);
export const selectProductsLoading = createSelector(
  selectProductsState,
  selectLoading
);
export const selectProductsError = createSelector(
  selectProductsState,
  selectError
);

/**
 * transform object to array
 */
export const selectProducts = createSelector(
  selectProductsData,
  entities => {
    return Object.keys(entities).map(id => entities[+id]);
  }
);

export const selectSelectedProductByUrl = createSelector(
  selectProductsData,
  selectRouterState,
  (products, router): ProductModel => {
    const productID = router.state.params.productID;
    if (productID && products) {
      return products.find(product => product.id === +productID) as ProductModel;
    } else {
      return null;
    }
  }
);

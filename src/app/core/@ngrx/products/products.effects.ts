import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { pluck, switchMap, catchError, map, concatMap } from 'rxjs/operators';

import * as ProductsActions from './products.actions';
import * as RouterActions from './../router/router.actions';
import { AsyncProductsService } from 'src/app/products/services/async-products.service';
import { IProduct, ProductModel } from 'src/app/shared/models/product';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private asyncProductService: AsyncProductsService,
  ) { }

  getProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      switchMap(action =>
        this.asyncProductService
          .getProducts()
          .then(products => ProductsActions.getProductsSuccess({ products }))
          .catch(error => ProductsActions.getProductsError({ error }))
      )
    )
  );

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      pluck('product'),
      concatMap((product: ProductModel) => this.asyncProductService.updateProduct(product)
        .pipe(
          map((updatedProduct: IProduct) => {
            return ProductsActions.updateProductSuccess({ product: updatedProduct });
          }),
          catchError(error => of(ProductsActions.updateProductError({ error }))
          )
        )
      )
    ));

  createProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      pluck('product'),
      concatMap((product: ProductModel) => this.asyncProductService.createProduct(product)
        .pipe(
          map((createdProduct: IProduct) => {
            return ProductsActions.createProductSuccess({ product: createdProduct });
          }),
          catchError(error => of(ProductsActions.createProductError({ error })))
        )
      )
    ));

    createUpdateTaskSuccess$: Observable<Action> = createEffect(() => {
      return this.actions$.pipe(
        ofType(ProductsActions.createProductSuccess, ProductsActions.updateProductSuccess),
        map(action =>
          RouterActions.go({
            path: ['/']
          })
        )
      );
    });

  deleteProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      pluck('product'),
      concatMap((product: ProductModel) => this.asyncProductService.deleteProduct(product)
        .pipe(
          map(() => ProductsActions.deleteProductSuccess({ product })),
          catchError(error => of(ProductsActions.deleteProductError({ error })))
        )
      )
    )
  );

}

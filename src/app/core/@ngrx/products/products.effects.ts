import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { pluck, switchMap, catchError, map, concatMap } from 'rxjs/operators';

import * as ProductsActions from './products.actions';
import { AsyncProductsService } from 'src/app/products/services/async-products.service';
import { IProduct, ProductModel } from 'src/app/shared/models/product';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private asyncProductService: AsyncProductsService,
    private router: Router
  ) { }

  getProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      switchMap(action =>
        // Notice!
        // If you have a connection to the Firebase,
        // the stream will be infinite - you have to unsubscribe
        // This can be performed following this pattern
        // this.taskObservableService
        //      .getTasks()
        //      .pipe(takeUntil(this.actions$.pipe(ofType(TasksActions.TaskListComponentIsDestroyed))
        // If you use HttpClient, the stream is finite,
        // so you have no needs to unsubscribe
        this.asyncProductService
          .getProducts()
          .then(products => ProductsActions.getProductsSuccess({ products }))
          .catch(error => ProductsActions.getProductsError({ error }))
      )
    )
  );

  getProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProduct),
      pluck('productID'),
      switchMap(productID => this.asyncProductService.getProduct(productID)
        .pipe(
          map(product => {
            console.log(product);
            return ProductsActions.getProductSuccess({ product });
          }),
          catchError(error => of(ProductsActions.getProductError({ error })))
        )
      )
    ));

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      pluck('product'),
      concatMap((product: ProductModel) => this.asyncProductService.updateProduct(product)
        .pipe(
          map((updatedProduct: IProduct) => {
            this.router.navigate(['/']);
            return ProductsActions.updateProductSuccess({ product: updatedProduct });
          }),
          catchError(error => of(ProductsActions.updateProductError({ error }))
          )
        )
      )
    ));

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ProductModel, IProduct } from '../../../shared/models/product';
import { AsyncProductsService } from '../../services';
import { IAppState } from './../../../core/@ngrx';
import { ProductsState, selectProductsData, selectProductsError } from 'src/app/core/@ngrx';
import * as ProductsActions from 'src/app/core/@ngrx/products/products.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<ReadonlyArray<IProduct>>;
  productsError$: Observable<Error | string>;

  private editedProduct: ProductModel;

  constructor(
    private asyncProductsService: AsyncProductsService,
    private route: ActivatedRoute,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductsData);
    this.store.dispatch(ProductsActions.getProducts());

    const observer = {
      next: (product: ProductModel) => {
        this.editedProduct = { ...product };
        console.log(
          `Last time you edited product ${JSON.stringify(this.editedProduct)}`
        );
      },
      error: (err: any) => console.log(err)
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const editedProductID = params.get('editedProductID');
          return editedProductID
            ? this.asyncProductsService.getProduct(+editedProductID)
            : of(null);
        })
      )
      .subscribe(observer);
  }

  isEdited(product: ProductModel): boolean {
    if (this.editedProduct) {
      return product.id === this.editedProduct.id;
    }
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ProductModel } from '../../../shared/models/product';
import { AsyncProductsService } from '../../services';
import { IAppState } from './../../../core/@ngrx';
import { ProductsState } from './../../../core/@ngrx/products/products.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productsState$: Observable<ProductsState>;

  private editedProduct: ProductModel;

  constructor(
    private asyncProductsService: AsyncProductsService,
    private route: ActivatedRoute,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.productsState$ = this.store.pipe(select('products'), tap(x => console.log(x)));

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

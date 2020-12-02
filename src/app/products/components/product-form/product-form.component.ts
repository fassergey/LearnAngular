import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Category } from './../../../shared/models/category.enum';
import { ProductModel, IProduct } from 'src/app/shared/models/product';
import { AsyncProductsService } from '../../services';
import * as ProductsActions from 'src/app/core/@ngrx/products/products.actions';
import { IAppState } from 'src/app/core/@ngrx';
import { ProductsState } from 'src/app/core/@ngrx/products/products.state';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  product: ProductModel;
  categories: string[];

  private sub: Subscription;
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private asyncProductsService: AsyncProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('productID');
    if (id > 0) {
      let observer: any = {
        next: (productsState: ProductsState) => {
            this.product = productsState.selectedProduct
              ? {...productsState.selectedProduct} as ProductModel
              : new ProductModel();
        },
        error(err) {
          console.log(err);
        },
        complete() {
          console.log('Stream is completed');
        }
      };

      this.store
        .pipe(
          select('products'),
          takeUntil(this.componentDestroyed$)
        )
        .subscribe(observer);

      observer = {
        ...observer,
        next: () => {
          this.store.dispatch(ProductsActions.getProduct({ productID: +id }));
        }
      };

      this.route.paramMap.subscribe(observer);
    }

    this.categories = Object.keys(Category);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.componentDestroyed$.complete();
  }

  onSaveProduct(): void {
    const product = { ...this.product } as IProduct;
    if (product.id) {
      this.store.dispatch(ProductsActions.updateProduct({ product }));
    } else {
      this.store.dispatch(ProductsActions.createProduct({ product }));
    }
  }

  onGoBack(): void {
    this.location.back();
  }
}

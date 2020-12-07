import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Category } from './../../../shared/models/category.enum';
import { ProductModel, IProduct } from 'src/app/shared/models/product';
import * as ProductsActions from 'src/app/core/@ngrx/products/products.actions';
import { selectSelectedProductByUrl } from 'src/app/core/@ngrx';

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
    private route: ActivatedRoute,
    private location: Location,
    private store: Store
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('productID');
    if (id > 0) {
      const observer: any = {
        next: (product: ProductModel) => {
            this.product = {...product};
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
          select(selectSelectedProductByUrl),
          takeUntil(this.componentDestroyed$)
        )
        .subscribe(observer);
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

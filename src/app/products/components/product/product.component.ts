import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProductModel } from '../../../shared/models/product';
import { CartService } from '../../../cart/services/cart.service';
import { IAppState } from './../../../core/@ngrx/app.state';
import { ProductsState } from 'src/app/core/@ngrx/products/products.state';
import * as ProductsActions from 'src/app/core/@ngrx/products/products.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product: ProductModel;

  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('productID');
    if (id > 0) {
      let observer: any = {
        next: (productsState: ProductsState) => {
          this.product = { ...productsState.selectedProduct } as ProductModel;
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
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.complete();
  }

  onBuy(): void {
    console.log(`Congratulations! You bought: ${this.product.name} by ${this.product.price}!`);
    this.cartService.addProduct(this.product);
  }

  onEdit(): void {
    this.router.navigate([`admin/products/edit/${this.product.id}`]);
  }

  onGoToProduct(): void {
    this.router.navigate([`product/${this.product.id}`], { relativeTo: this.route });
  }
}

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductModel } from '../../../shared/models/product';
import { CartService } from '../../../cart/services/cart.service';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { selectSelectedProductByUrl } from 'src/app/core/@ngrx';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductViewComponent implements OnInit, OnDestroy {
  product: ProductModel;

  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
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
}

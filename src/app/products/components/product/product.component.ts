import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ProductModel } from '../../../shared/models/product';
import { CartService } from '../../../cart/services/cart.service';
import { AsyncProductsService } from '../../services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product: ProductModel;

  private sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private asyncProductService: AsyncProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('productID');
    if (id > 0) {
      const observer = {
        next: (product: ProductModel) => {
          this.product = { ...product };
        },
        error: (err: any) => console.log(err)
      };
      this.sub = this.asyncProductService.getProduct(id).subscribe(observer);
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onBuy(): void {
    console.log(`Congratulations! You bought: ${this.product.name} by ${this.product.price}!`);
    this.cartService.addProduct(this.product);
  }

  onGoToProduct(): void {
    this.router.navigate([`product/${this.product.id}`], {relativeTo: this.route});
  }
}

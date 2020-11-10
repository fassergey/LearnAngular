import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductModel } from '../../../shared/models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit, OnDestroy {
  product: ProductModel;
  count: number;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('itemID');

    if (productId > 0) {
      const sub = this.cartService.getCartItemByProductId(productId)
        .subscribe(cartItem => {
          this.product = { ... cartItem };
          this.count = cartItem ? cartItem.count : 0;
        });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onChangeQuantity(difference: number): void {
    difference === 1 ? this.cartService.increaseQuantity(this.product) : this.cartService.decreaseQuantity(this.product);

    if (this.count === 0) {
      this.redirectToCart();
    }
  }

  onRemoveProduct(): void {
    this.cartService.removeProduct(this.product);
    this.redirectToCart();
  }

  onGoBack(): void {
    this.redirectToCart();
  }

  private redirectToCart(): void {
    this.router.navigate(['cart']);
  }
}

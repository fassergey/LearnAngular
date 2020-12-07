import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductModel } from '../../../shared/models/product';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product: ProductModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  onBuy(): void {
    console.log(`Congratulations! You bought: ${this.product.name} by ${this.product.price}!`);
    this.cartService.addProduct(this.product);
  }

  onEdit(): void {
    this.router.navigate([`admin/products/edit/${this.product.id}`]);
  }

  onGoToProduct(): void {
    this.router.navigate([`product-view/${this.product.id}`], { relativeTo: this.route });
  }
}

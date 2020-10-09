import { Component, Input } from '@angular/core';

import { Product } from './models/product';
import { CartService } from './../shared/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product;

  // не нужно тут внедрять зависимость, лучше использовать @Output
  constructor(private cartService: CartService) { }

  onBuy(): void {
    console.log(`Congratulations! You bought: ${this.product.name} by ${this.product.price}!`);
    this.cartService.addToCart(this.product);
  }
}
// переместите этот компонент в папку app/product/components

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product;
  @Output() productBought = new EventEmitter<void>();

  constructor() { }

  onBuy(): void {
    console.log(`Congratulations! You bought: ${this.product.name} by ${this.product.price}!`);
    this.productBought.emit();
  }
}

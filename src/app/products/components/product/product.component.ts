import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { ProductModel } from '../../../shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product: ProductModel;
  @Output() productBought = new EventEmitter<void>();

  constructor() { }

  onBuy(): void {
    console.log(`Congratulations! You bought: ${this.product.name} by ${this.product.price}!`);
    this.productBought.emit();
  }
}

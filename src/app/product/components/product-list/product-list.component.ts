import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Product } from '../../../shared/models/product';
import { CartService } from '../../../cart/services/cart.service';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Output() cartUpdated: EventEmitter<void> = new EventEmitter<void>();

  products: Product[];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  onProductBought(product: Product): void {
    this.cartService.addToCart(product);
    this.cartUpdated.emit();
  }
}

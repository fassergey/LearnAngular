import { Component, OnInit } from '@angular/core';

import { Product } from './../../models/product';
import { CartService } from './../../../cart-list/services/cart.service';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
    console.log(this.products);
  }

  onProductBought(product: Product): void {
    this.cartService.addToCart(product);
  }
}

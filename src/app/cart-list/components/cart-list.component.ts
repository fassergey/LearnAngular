import { Component, OnInit } from '@angular/core';

import { Product } from './../../product/models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  products: Product[];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.cartService.products;
  }

}

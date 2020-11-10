import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent implements OnInit, OnDestroy {
  products: CartItem[];
  field: string;
  ascOrder: boolean;

  private sub: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.cartService.products$.subscribe(data => this.products = data);
    this.field = 'price';
    this.ascOrder = true;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onEdit(id: number): void {
    this.router.navigate([`edit/${id}`], {relativeTo: this.route});
  }

  get numberOfGoods(): number {
    return this.cartService.totalQuantity;
  }

  get sumOfGoods(): number {
    return this.cartService.totalSum;
  }

  asCartItem(o: object): CartItem {
    return o as CartItem;
  }

  trackByFn(index): number {
    return index;
  }
}

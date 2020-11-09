import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartService } from './cart/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('appTitle') appTitle: ElementRef;

  cartMenuItemTitle: string;
  cartItemQty: number;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.products$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(products => this.cartItemQty = products.length);
  }

  ngAfterViewInit(): void {
    this.appTitle.nativeElement.innerText = 'Fasolko\'s Stall';
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

  get cartItemQuantity(): string {
    return this.cartItemQty > 0 ? `Cart - ${this.cartItemQty}` : 'Cart';
  }
}

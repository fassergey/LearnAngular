import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartService } from './cart/services/cart.service';
import { AppSettingsService } from './core/services/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('appTitle') appTitle: ElementRef;

  cartItemQty: number;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private cartService: CartService,
    private appSettingsService: AppSettingsService
    ) { }

  ngOnInit(): void {
    this.cartService.products$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(products => this.cartItemQty = products.length);

    this.appSettingsService.loadAppSettings();
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

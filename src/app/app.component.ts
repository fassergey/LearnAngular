import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { CartListComponent } from './cart/components/cart-list/cart-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle') appTitle: ElementRef;
  @ViewChild('cartList') cartList: CartListComponent;

  ngAfterViewInit(): void {
    this.appTitle.nativeElement.innerText = 'Fasolko\'s Stall';
  }

  onCartUpdated(): void {
    this.cartList.refresh();
  }
}

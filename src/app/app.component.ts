import { Component, ViewChild } from '@angular/core';

import { CartListComponent } from './cart/components/cart-list/cart-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('cartList') cartList: CartListComponent;

  title = 'shop';

  onCartUpdated(): void {
    this.cartList.refresh();
  }
}

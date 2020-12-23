import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { CartService } from './cart/services/cart.service';
import { AppSettingsService } from './core/services/app-settings.service';
import { CartItem } from './cart/models/cart-item';

describe('AppComponent', () => {
  let cartServiceStub: Partial<CartService>;
  let appSettingsServiceStub: Partial<AppSettingsService>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    appSettingsServiceStub = {
      loadAppSettings: () => {}
    };

    const cartItems: CartItem[] = [
      {
        name: 'product',
        description: 'description',
        count: 3,
        id: 1,
        isAvailable: true,
        price: 12
      }
    ];
    cartServiceStub = {
      products$: of(new Array<CartItem>(...cartItems))
    };

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: CartService, useValue: cartServiceStub },
        { provide: AppSettingsService, useValue: appSettingsServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it(`should have 'Cart - 1' in cartItemQuantity when Cart contains 1 product`, () => {
    fixture.detectChanges();
    expect(component.cartItemQuantity).toEqual('Cart - 1');
  });
});

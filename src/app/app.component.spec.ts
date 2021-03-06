import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
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
    cartServiceStub = {
      products$: of(new Array<CartItem>())
    };

    appSettingsServiceStub = {
      loadAppSettings: () => {}
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

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Fasolko\'s Stall'`, () => {
    let de: DebugElement = fixture.debugElement.query(By.css('.title h1'));
    let el: HTMLElement = de.nativeElement;

    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toEqual('Fasolko\'s Stall');
  });

  it('should have 0 in cartItemQty', () => {
    fixture.detectChanges();
    expect(component.cartItemQty).toEqual(0);
  });

  it(`should have 'Cart' in cartItemQuantity`, () => {
    fixture.detectChanges();
    expect(component.cartItemQuantity).toEqual('Cart');
  });
});

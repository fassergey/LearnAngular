import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { CanComponentDeactivate, DialogService } from 'src/app/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { OrderModel } from '../../models/order.model';
import { OrderArrayService } from '../../services/order-array.service';
import { CustomValidators } from '../../validators';
import { CartService } from './../../../cart/services/cart.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  order: OrderModel;
  originalOrder: OrderModel;
  orderForm: FormGroup;
  selfPickup = false;
  validationMessage: string;

  private subCart: Subscription;
  private nextOrderIndex: number;
  private validationMessagesMap = {
    clientFirstName: {
      required: 'Please enter your first name.',
      clientFirstName: 'The first name should be longer then 3 symbols.'
    },
    clientEmail: {
      required: 'Please enter your email address.',
      clientEmail: 'Please enter a valid email address.'
    }
  };


  constructor(
    private orderArrayService: OrderArrayService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private cartService: CartService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) { }

  get phones(): FormArray {
    return this.orderForm.get('phones') as FormArray;
  }

  get isClientFirstNameInvalid(): boolean {
    return this.validationMessage &&
      (this.orderForm.get('clientFirstName').touched ||
      this.orderForm.get('clientFirstName').dirty) &&
      !this.orderForm.get('clientFirstName').valid
  }

  get isClientEmailInvalid(): boolean {
    return this.validationMessage &&
      (this.orderForm.get('clientEmail').touched ||
      this.orderForm.get('clientEmail').dirty) &&
      !this.orderForm.get('clientEmail').valid
  }

  ngOnInit(): void {
    this.nextOrderIndex = this.orderArrayService.proceedingOrdersCount + 1;

    this.subCart = this.cartService.products$.subscribe(data => {
      this.order = new OrderModel('', '', '', '', '', data, this.cartService.totalSum, null);
      this.originalOrder = { ...this.order };
    });

    this.buildForm();
    this.watchValueChanges();
  }

  ngOnDestroy(): void {
    this.subCart.unsubscribe();
  }

  onSaveOrder(): void {
    const order = { ...this.order };
    order.id = this.nextOrderIndex;

    if (this.order.id) {
      this.orderArrayService.updateOrder(order);
    } else {
      this.orderArrayService.createOrder(order);
      this.localStorageService.removeItem(this.cartService.localStorageKey);
      this.cartService.removeAllProducts();
    }

    this.originalOrder = { ...this.order, id: this.nextOrderIndex };
    this.router.navigate(['orders']);
  }

  onGoBack(): void {
    this.router.navigate(['./../../'], { relativeTo: this.route });
  }

  onToggleAddress(): void {
    this.selfPickup = !this.selfPickup;
    console.log(this.selfPickup);
  }

  onAddPhone(): void {
    this.phones.push(this.buildPhoneControl());
  }

  onRemovePhone(index: number): void {
    this.phones.removeAt(index);
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const flags = Object.keys(this.originalOrder).map(key => {
      if (this.originalOrder[key] === this.order[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  private buildForm(): void {
    this.orderForm = this.fb.group({
      clientFirstName: ['', CustomValidators.clientFirstName(3)],
      clientLastName: [],
      clientEmail: [''],
      clientAddress: [],
      phones: this.fb.array([this.buildPhoneControl()])
    });
  }

  private buildPhoneControl(): FormControl {
    return this.fb.control('');
  }

  private watchValueChanges(): void {
    const clientFirstNameControl = this.orderForm.get('clientFirstName');
    const sub1 = clientFirstNameControl.valueChanges.subscribe(value =>
      this.setValidationMessage(clientFirstNameControl, 'clientFirstName')
    );
    this.subCart.add(sub1);

    const clientEmailControl = this.orderForm.get('clientEmail');
    const sub2 = clientEmailControl.valueChanges.subscribe(value =>
      this.setValidationMessage(clientEmailControl, 'clientEmail')
    );
    this.subCart.add(sub2);
  }

  private setValidationMessage(c: AbstractControl, controlName: string): void {
    this.validationMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.validationMessage = Object.keys(c.errors)
        .map(key => this.validationMessagesMap[controlName][key])
        .join(' ');
    }
  }

  onBlur(field: string): void {
    const control = this.orderForm.get(field);
    this.setValidationMessage(control, field);
  }

}

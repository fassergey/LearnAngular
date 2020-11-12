import { CartItem } from '../../cart/models/cart-item';

export class OrderModel {
  constructor(
    public clientFirstName: string,
    public clientLastName: string,
    public items: CartItem[],
    public totalSum: number,
    public id?: number,
  ) {}
}

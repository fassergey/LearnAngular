import { CartItem } from '../../cart/models/cart-item';

export class OrderModel {
  constructor(
    public id: number,
    public clientFirstName: string,
    public clientLastName: string,
    public items: CartItem[],
    public totalSum: number
  ) {}
}

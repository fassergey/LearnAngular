import { CartItem } from '../../cart/models/cart-item';

export class OrderModel {
  constructor(
    public clientFirstName: string,
    public clientLastName: string,
    public clientEmail: string,
    public clientPhone: string,
    public clientAddress: string,
    public items: CartItem[],
    public totalSum: number,
    public id?: number,
  ) {}
}

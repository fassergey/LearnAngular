import { CartItem } from './../../cart/models/cart-item';
import { OrderByPipe } from "./order-by.pipe";

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();
  const cartItems: CartItem[] = [
    { id: 4, name: 'name-4', description: 'description-4', price: 4, isAvailable: true, count: 4 },
    { id: 1, name: 'name-1', description: 'description-1', price: 1, isAvailable: true, count: 1 },
    { id: 2, name: 'name-2', description: 'description-2', price: 2, isAvailable: true, count: 2 },
    { id: 3, name: 'name-3', description: 'description-3', price: 3, isAvailable: true, count: 3 }
  ];

  it('order by id asc', () => {
    expect(pipe.transform(cartItems, 'id', true)).toBeTruthy(cartItems[0].id === 1);
  });

  it('order by name desc', () => {
    expect(pipe.transform(cartItems, 'name', false)).toBeTruthy(cartItems[0].name === 'name-4');
  });
});

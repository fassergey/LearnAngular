import { Product } from '../../shared/models/product';

export interface CartItem extends Product {
  count: number;
}

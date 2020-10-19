import { Product } from '../../shared/models/product';

export interface CartItem {
  product: Product;
  count: number;
}

import { ProductModel } from '../../shared/models/product';

export interface CartItem extends ProductModel {
  count: number;
}

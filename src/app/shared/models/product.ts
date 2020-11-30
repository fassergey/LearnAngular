import { Category } from './category.enum';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  category?: Category;
  isAvailable?: boolean;
}

export class ProductModel implements IProduct {
  constructor(
    public id: number = null,
    public name: string = '',
    public description: string = '',
    public price: number = 0,
    public category?: Category,
    public isAvailable: boolean = false) {}
}

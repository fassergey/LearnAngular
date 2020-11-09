import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Category } from './../../../shared/models/category.enum';
import { ProductModel } from 'src/app/shared/models/product';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  product: ProductModel;
  categories: string[];

  private sub: Subscription;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product = new ProductModel();

    const id = +this.route.snapshot.paramMap.get('productID');
    const observer = {
      next: (product: ProductModel) => this.product = { ...product },
      error: (err: any) => console.log(err)
    };
    this.sub = this.productsService.getProduct(id).subscribe(observer);

    this.categories = Object.keys(Category);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSaveProduct(): void {
    const product = { ...this.product };

    if (product.id) {
      this.productsService.updateProduct(product);
    } else {
      this.productsService.createProduct(product);
    }
  }

  onGoBack(): void {

  }
}

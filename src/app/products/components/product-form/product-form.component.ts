import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Category } from './../../../shared/models/category.enum';
import { ProductModel } from 'src/app/shared/models/product';
import { ProductsService } from '../../services/products-service';
import { pluck } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(pluck('product')).subscribe((product: ProductModel) => {
      this.product = { ...product };
    });

    this.categories = Object.keys(Category);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSaveProduct(): void {
    const product = { ...this.product };

    if (product.id) {
      this.productsService.updateProduct(product);
      this.router.navigate(['/product-list', {editedProductID: product.id}]);
    } else {
      this.productsService.createProduct(product);
      this.onGoBack();
    }
  }

  onGoBack(): void {
    this.router.navigate(['./../../'], { relativeTo: this.route});
  }
}

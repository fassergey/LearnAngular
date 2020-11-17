import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Category } from './../../../shared/models/category.enum';
import { ProductModel } from 'src/app/shared/models/product';
import { AsyncProductsService } from '../../services';

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
    private asyncProductsService: AsyncProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(pluck('product')).subscribe((product: ProductModel) => {
      this.product = { ...product };
    });

    this.categories = Object.keys(Category);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onSaveProduct(): void {
    const product = { ...this.product };

    // if (product.id) {
    //   this.productsService.updateProduct(product);
    //   this.router.navigate(['/product-list', { editedProductID: product.id }]);
    // } else {
    //   this.productsService.createProduct(product);
    //   this.onGoBack();
    // }

    const method = product.id ? 'updateProduct' : 'createProduct';
    const observer = {
      next: () => {
        product.id
          ? this.router.navigate(['product-list', { editedProductID: product.id }])
          : this.onGoBack();
      },
      error: (err: any) => console.log(err)
    };
    this.sub = this.asyncProductsService[method](product).subscribe(observer);

  }

  onGoBack(): void {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProductModel } from '../../../shared/models/product';
import { AsyncProductsService } from '../../services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Promise<ProductModel[]>;

  private editedProduct: ProductModel;

  constructor(
    private asyncProductsService: AsyncProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.products$ = this.asyncProductsService.getProducts();

    const observer = {
      next: (product: ProductModel) => {
        this.editedProduct = { ...product };
        console.log(
          `Last time you edited product ${JSON.stringify(this.editedProduct)}`
        );
      },
      error: (err: any) => console.log(err)
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const editedProductID = params.get('editedProductID');
          return editedProductID
            ? this.asyncProductsService.getProduct(+editedProductID)
            : of(null);
        })
      )
      .subscribe(observer);
  }

  isEdited(product: ProductModel): boolean {
    if (this.editedProduct) {
      return product.id === this.editedProduct.id;
    }
    return false;
  }
}

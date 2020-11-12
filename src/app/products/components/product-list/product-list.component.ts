import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProductModel } from '../../../shared/models/product';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<ProductModel[]>;

  private editedProduct: ProductModel;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.products$ = this.productsService.products$;

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
        switchMap((params: ParamMap) => this.productsService.getProduct(+params.get('editedProductID')))
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

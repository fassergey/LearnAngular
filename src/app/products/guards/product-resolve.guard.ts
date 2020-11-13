import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { ProductModel } from 'src/app/shared/models/product';
import { ProductsService } from '../services/products-service';


@Injectable({
  providedIn: 'any'
})
export class ProductResolveGuard implements Resolve<ProductModel> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductModel | null> {
    console.log('ProductResolve Guard is called');

    if (!route.paramMap.has('productID')) {
      return of(new ProductModel());
    }

    const id = +route.paramMap.get('productID');

    return this.productsService.getProduct(id).pipe(
      map((product: ProductModel) => {
        if (product) {
          return product;
        } else {
          this.router.navigate(['/product-list']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/product-list']);
        // catchError MUST return observable
        return of(null);
      })
    );
  }
}

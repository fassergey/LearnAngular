import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';

// ngrx
import { Store, select } from '@ngrx/store';
import { selectProductsData } from './../../core/@ngrx';
import * as RouterActions from './../../core/@ngrx/router/router.actions';

// rxjs
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { checkStore } from './check-store.function';

@Injectable({
  providedIn: 'root'
})
export class ProductExistsGuard implements CanActivateChild {
  constructor(private store: Store) { }

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
    return checkStore(this.store).pipe(
      switchMap(() => {
        const id = +route.paramMap.get('productID');
        return this.hasProduct(id);
      })
    );
  }

  private hasProduct(id: number): Observable<boolean> {
    return this.store.pipe(
      select(selectProductsData),

      // check if task with id exists
      map(products => !!products.find(product => product.id === id)),

      // make a side effect
      tap(result => {
        if (!result) {
          this.store.dispatch(RouterActions.go({ path: ['/'] }));
        }
      }),

      // automatically unsubscribe
      take(1)
    );
  }
}

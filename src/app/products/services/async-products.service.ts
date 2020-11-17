import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { ProductModel } from 'src/app/shared/models/product';
import { catchError, concatMap, retry, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class AsyncProductsService {
  private productsUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Promise<ProductModel[]> {
    return this.http
      .get(this.productsUrl)
      .toPromise()
      .then(response => response as ProductModel[])
      .catch(this.handleErrorFromPromise);
  }

  getProduct(id: number): Observable<ProductModel> {
    const url = `${this.productsUrl}/${id}`;

    return this.http.get<ProductModel>(url)
      .pipe(
        retry(3),
        share(), // = publish() + refCount()
        catchError(this.handleErrorFromObservable)
      );
  }

  updateProduct(product: ProductModel): Observable<ProductModel> {
    const url = `${this.productsUrl}/${product.id}`;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .put<ProductModel>(url, body, options)
      .pipe(catchError(this.handleErrorFromObservable));
  }


  createProduct(product: ProductModel): Observable<ProductModel> {
    const url = this.productsUrl;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post<ProductModel>(url, body, options)
      .pipe(
        catchError(this.handleErrorFromObservable)
      );
  }


  deleteProduct(product: ProductModel): Observable<ProductModel[]> {
    const url = `${this.productsUrl}/${product.id}`;

    return this.http.delete(url).pipe(
      concatMap(() => this.getProducts()),
      catchError(this.handleErrorFromPromise)
    );
  }


  private handleErrorFromPromise(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private handleErrorFromObservable(err: HttpErrorResponse) {
    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}

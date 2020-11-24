import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class TsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request interceptor
    let clonedRequest;
    let hronometerStart;
    if (req.url.includes('products')) {
      hronometerStart = performance.now();
      clonedRequest = req.clone({
        params: new HttpParams()
          .set('ts_interceptor', Date.now().toString())
        // clear the body
        // body: null
      });
      console.log(clonedRequest);
    } else {
      clonedRequest = req;
    }

    return next.handle(clonedRequest).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((event: HttpResponse<any>) => {
        // do stuff with response
        if (event.url.includes('products')) {
          const hronometerEnd = performance.now();
          console.log('Response Interceptor:');
          console.log(event);
          console.log(event.body);
          console.log(`The product-list request was executed in ${hronometerEnd - hronometerStart} milliseconds`);
        }
        return event;
      })
    );

  }
}

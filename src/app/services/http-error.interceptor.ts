import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // request interception logic here
    console.log('INTERCEPTED', request.url); // add token here
    // response interception should be done thru the handler
    if (request.url.includes('/user')) {
      // user
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('ERROR interception', error); // error logging
        return throwError(error);
      })
      // finalize(()=>{return mock_data})
    );
  }
}

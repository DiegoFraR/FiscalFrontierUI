import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        // Handle client-side or network error
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Handle server-side error
          errorMessage = typeof error.error === 'string' ? error.error : `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        console.error('HTTP error occurred:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
    
  }
}

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Actions from '../store/server-errors.actions';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor{

  constructor(
    private store: Store
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    
    return next.handle(req).pipe(
      map((response) => {
        if(response instanceof HttpResponse && ((response as HttpResponse<any>).ok))
          this.store.dispatch(Actions.clearError());
        return response;
      }),
      catchError((response: HttpErrorResponse) => {
      if(response.status !== 200)
        this.store.dispatch(Actions.setError({status: response.status, message: response.error.message}));
      return of(response);
    }))
  }
  
}

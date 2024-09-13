import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as ServerErrorActions from '../store/server-errors/server-errors.actions';
import * as AuthActions from '../store/auth/auth.actions';
import { selectIsAuthenticated } from '../store/auth/auth.selector';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor{

  constructor(
    private store: Store
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    
    return next.handle(req).pipe(
      map((response) => {
        if(response instanceof HttpResponse && ((response as HttpResponse<any>).ok))
          this.store.dispatch(ServerErrorActions.clearError());
        return response;
      }),
      catchError((response: HttpErrorResponse) => {
      if(response.status !== 200)
        this.store.dispatch(ServerErrorActions.setError({status: response.status, message: response.error.message}));
      if(response.status === 401){
        this.store.dispatch(AuthActions.invalidToken());
      }
      return of(response);
    }))
  }
  
}

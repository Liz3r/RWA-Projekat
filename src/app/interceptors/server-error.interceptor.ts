import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor{

  constructor(
    private store: Store
  ) {
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(catchError((response: HttpErrorResponse) => {
      //dispecuj error
      //if(response.status !== 200)
        //store.dispatch();
      console.log(response.error);
      return of(response.error);
    }))
  }
  
}

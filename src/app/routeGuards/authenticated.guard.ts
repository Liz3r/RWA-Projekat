import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app-state';
import { selectIsAuthenticated } from '../store/auth/auth.selector';
import { map, Observable, of, switchMap, takeLast, withLatestFrom } from 'rxjs';

export const authenticatedGuard: CanActivateFn = (route, state):Observable<boolean> => {
  
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    switchMap((isAuth) => {
        console.log(isAuth);
        if(isAuth)
          return of(true);
        router.navigate(["/account/login"]);
        return of(false);
    })
  )

};

export const notAuthenticatedGuard: CanActivateFn = (route, state):Observable<boolean> => {
  
  const store = inject(Store<AppState>);
  const router = inject(Router);
  
  return store.select(selectIsAuthenticated).pipe(
    switchMap((isAuth) => {
      if(isAuth){
        router.navigate(["/authenticated"]);
        return of(false);
      }
      return of(true);
    })
  )

};
import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/app-state';
import { selectIsAuthenticated } from '../store/auth/auth.selector';
import { combineLatest, filter, map, Observable, of, switchMap, take, takeLast, withLatestFrom } from 'rxjs';
import { checkToken } from '../store/auth/auth.actions';

export const authenticatedGuard: CanActivateFn = (route, state):Observable<boolean> => {
  
  const store = inject(Store<AppState>);
  const router = inject(Router);
  return store.select(selectIsAuthenticated).pipe(
    switchMap((isAuth) => {
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
        router.navigate(["/authenticated/home"]);
        return of(false);
      }
      return of(true);
    })
  )

};

// export const initialStateGuard: CanActivateFn = (route, state):Observable<boolean> => {
  
//   const store = inject(Store<AppState>);
//   const router = inject(Router);
//   console.log("INIT GUARD")

//   return of(true);

//   //prvo selektujem feature za autentifikaciju i filtriram null vrednost
//   //zato sto je to inicijalno stanje
//   //(selekt koristim u pipe operatoru da bih mogao da dodam filter proveru  i take(1) u stream)
//   // const isAuth$ = store.pipe(
//   //   select(selectIsAuthenticated),
//   //   filter((isAuth) => isAuth !== null)
//   // );

//   // //vraca undefined kada se izvrsi dispatch (dakle sigurno se izvrsio dispatch)
//   // const dispatch$ = of(store.dispatch(checkToken()));

//   // //obezbedjuje da dispatch mora da se izvrsi
//   // //emituje se vrednost tek kada oba observables-a emitiju nesto dakle dispatch se mora izvrsiti
//   // //(dispatch ce emitovati undefined)
//   // // dok ce isAuth$ emitovati vrednost koja nije null (dakle dispatch je sigurno zamenio stanje u store-u)
//   // return combineLatest([isAuth$, dispatch$]).pipe(
//   //   switchMap(([isAuth]) => {
//   //     if(isAuth)
//   //       router.navigate(['authenticated/home']);
//   //     else
//   //       router.navigate(['account/login']);
//   //     //obavlja se navigacija, uzima jedna vrednost
//   //     //i u svakom slucaju vraca true da bi se nastavilo sa inicijalizacijom
//   //     console.log(isAuth);
//   //     return store.pipe(
//   //       take(1),
//   //       filter((isAuth) => true)
//   //     )
//   //   })
//   // )

// };
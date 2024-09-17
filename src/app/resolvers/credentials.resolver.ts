import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/app-state';
import { checkToken } from '../store/auth/auth.actions';
import { combineLatest, filter, map, of, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { selectIsAuthenticated } from '../store/auth/auth.selector';

export const credentialsResolver: ResolveFn<boolean> = (route, state) => {

  const store = inject(Store<AppState>);
  const router = inject(Router);
  
  console.log("from resolver");
  //store.dispatch(checkToken());

  //prvo selektujem feature za autentifikaciju i filtriram null vrednost
  //zato sto je to inicijalno stanje
  //(selekt koristim u pipe operatoru da bih mogao da dodam filter proveru  i take(1) u stream)
  const isAuth$ = store.pipe(
    select(selectIsAuthenticated),
    filter((isAuth) => isAuth !== null)
  );

  //vraca undefined kada se izvrsi dispatch (dakle sigurno se izvrsio dispatch)
  const dispatch$ = of(store.dispatch(checkToken()));

  //obezbedjuje da dispatch mora da se izvrsi
  //emituje se vrednost tek kada oba observables-a emitiju nesto dakle dispatch se mora izvrsiti
  //(dispatch ce emitovati undefined)
  // dok ce isAuth$ emitovati vrednost koja nije null (dakle dispatch je sigurno zamenio stanje u store-u)
  return combineLatest([isAuth$, dispatch$]).pipe(
    switchMap(([isAuth]) => {
      if(isAuth)
        router.navigate(['authenticated/home']);
      else
        router.navigate(['account/login']);
      //obavlja se navigacija, uzima jedna vrednost
      //i u svakom slucaju vraca true da bi se nastavilo sa inicijalizacijom
      return store.pipe(
        take(1),
        filter((isAuth) => !isAuth)
      )
    })
  )
  

};


  // //prvo selektujem feature za autentifikaciju i filtriram null vrednost
  // //zato sto je to inicijalno stanje
  // //(selekt koristim u pipe operatoru da bih mogao da dodam filter proveru  i take(1) u stream)
  // const isAuth$ = store.pipe(
  //   select(selectIsAuthenticated),
  //   filter((isAuth) => isAuth !== null)
  // );

  // //vraca undefined kada se izvrsi dispatch (dakle sigurno se izvrsio dispatch)
  // const dispatch$ = of(store.dispatch(checkToken()));

  // //obezbedjuje da dispatch mora da se izvrsi
  // //emituje se vrednost tek kada oba observables-a emitiju nesto dakle dispatch se mora izvrsiti
  // //(dispatch ce emitovati undefined)
  // // dok ce isAuth$ emitovati vrednost koja nije null (dakle dispatch je sigurno zamenio stanje u store-u)
  // return combineLatest([isAuth$, dispatch$]).pipe(
  //   switchMap(([isAuth]) => {
  //     if(isAuth)
  //       router.navigate(['authenticated/home']);
  //     else
  //       router.navigate(['account/login']);
  //     //obavlja se navigacija, uzima jedna vrednost
  //     //i u svakom slucaju vraca true da bi se nastavilo sa inicijalizacijom
  //     return store.pipe(
  //       take(1),
  //       filter((isAuth) => true)
  //     )
  //   })
  // )


  //drugi pristup
  // store.dispatch(checkToken());

  //   // Create an observable from the store selector with filtering
  //   return store.pipe(
  //     select(selectIsAuthenticated),
  //     filter(isTokenValid => isTokenValid !== null && isTokenValid !== undefined),
  //     tap(isTokenValid => {
  //       // Perform navigation based on token validity
  //       if (!isTokenValid) {
  //         // Redirect to login page if token is invalid
  //         router.navigate(['/login']);
  //       } else {
  //         // Redirect to home or any other authenticated page if token is valid
  //         router.navigate(['/home']);
  //       }
  //     }),
  //     take(1), // Complete after the first valid value
  //     map(isAuth => true) // Always return true to allow navigation
  //   );
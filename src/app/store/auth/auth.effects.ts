import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import * as AuthActions from "./auth.actions";
import { catchError, distinctUntilChanged, map, of, switchMap, tap } from "rxjs";
import { User } from "../../../models/user";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { selectIsAuthenticated } from "./auth.selector";
import { AppState } from "../app-state";

@Injectable()
export class AuthEffects{

    constructor(
        private actions$: Actions, 
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(({ username, password }) =>
                this.authService.login(username, password).pipe(
                map((res) => {
                    const user: User = {
                        id: res.user_id,
                        user_email: res.user_email,
                        first_name: res.user_firstname
                    };
                    return AuthActions.loginSuccess({user})}),
                    catchError(() => of(AuthActions.loginFailure()))
                )
            )
            )
        );
    
    register$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.register),
            switchMap(({createUserDto}) => 
                this.authService.register(createUserDto).pipe(
                    map(() => AuthActions.registerSuccess()),
                    catchError(() => of(AuthActions.registerFailure()))
                )
            )
        )
    );

    checkToken$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.checkToken),
        switchMap(() => 
            this.authService.checkToken().pipe(
                map((res) => {
                    const user: User = {
                        id: res.user_id,
                        user_email: res.user_email,
                        first_name: res.user_firstname
                    };
                    console.log(res);
                    return AuthActions.validToken({user});
                }),
                catchError(() => of(AuthActions.invalidToken()))
            )
        )
    ))

    redirectOnAuthChange$ = createEffect(() => this.store.select(selectIsAuthenticated).pipe(
        distinctUntilChanged(),
        tap((isAuth) => {
            if(isAuth)
                this.router.navigate(["/authenticated"]);
            else
                this.router.navigate(["/account/login"]);
        })
    ), { dispatch: false});

}
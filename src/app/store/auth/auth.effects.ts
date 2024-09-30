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

    updateProfile$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.updateProfile),
        switchMap(({changes}) => this.authService.updateProfile(changes).pipe(
            map((updatedUser) => {
                if(updatedUser.hasOwnProperty('address') &&
                updatedUser.hasOwnProperty('bio') &&
                updatedUser.hasOwnProperty('city') &&
                updatedUser.hasOwnProperty('country') &&
                updatedUser.hasOwnProperty('first_name') &&
                updatedUser.hasOwnProperty('id') &&
                updatedUser.hasOwnProperty('last_name') &&
                updatedUser.hasOwnProperty('phone_number') &&
                updatedUser.hasOwnProperty('user_email')){
                        const user: User = {...updatedUser};
                        return AuthActions.updateProfileSucceeded({user: user});
                    }
                    return AuthActions.updateProfileFailed();
            }),
            catchError(() => of(AuthActions.updateProfileFailed()))
        ))
    ))

    loadProfile$ =  createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.loadFullProfile),
            switchMap(() => this.authService.loadProfile().pipe(
                map((userRes) => {
                    if(userRes.hasOwnProperty('address') &&
                    userRes.hasOwnProperty('bio') &&
                    userRes.hasOwnProperty('city') &&
                    userRes.hasOwnProperty('country') &&
                    userRes.hasOwnProperty('first_name') &&
                    userRes.hasOwnProperty('id') &&
                    userRes.hasOwnProperty('last_name') &&
                    userRes.hasOwnProperty('phone_number') &&
                    userRes.hasOwnProperty('user_email')){
                        const user: User = {...userRes};
                        return AuthActions.loadProfileSucceeded({user: user});
                    }
                    return AuthActions.loadProfileFailed();
                }),
                catchError(() => of(AuthActions.loadProfileFailed()))
            ))
        )
    )

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            tap(() => {console.log("from effect")}),
            switchMap(({ username, password }) =>
                this.authService.login(username, password).pipe(
                map((res) => {
                    const user: User = {
                        id: res.user_id,
                        user_email: res.user_email,
                        first_name: res.user_firstname
                    };
                    this.router.navigate(['authenticated/home']);
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
                    return AuthActions.validToken({user});
                }),
                catchError(() => of(AuthActions.invalidToken()))
            )
        )
    ))

    // redirectOnAuthChange$ = createEffect(() => this.store.select(selectIsAuthenticated).pipe(
    //     distinctUntilChanged(),
    //     tap((isAuth) => {
            
    //         if(isAuth && !this.router.url.startsWith("/authenticated"))
    //             this.router.navigate(["/authenticated/home"]);
    //         else if(isAuth && !this.router.url.startsWith("/account"))
    //             this.router.navigate(["/account/login"]);
    //     })
    // ), { dispatch: false});

}
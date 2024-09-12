import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import * as AuthActions from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { User } from "../../../models/user";

@Injectable()
export class AuthEffects{

    constructor(
        private actions$: Actions, 
        private authService: AuthService 
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            tap(() => {console.log("effect called")}),
            ofType(AuthActions.login),
            switchMap(({ username, password }) =>
                this.authService.login(username, password).pipe(
                map((res) => {
                    const user: User = {
                        id: res.user_id,
                        user_email: res.user_email,
                        first_name: res.user_firstname
                    };
                    user.id = res.user_id;
                    return AuthActions.loginSuccess({user})})
                )
            )
            )
        );
    
        
}
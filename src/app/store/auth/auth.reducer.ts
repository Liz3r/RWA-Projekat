import { createReducer, on } from "@ngrx/store";
import { User } from "../../../models/user";
import * as Actions from './auth.actions';


export interface AuthState{
    isAuthenticated: boolean,
    isLoading: boolean,
    user: User | null
}

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}

export const authReducer = createReducer(
    initialAuthState,
    on(Actions.login, (state) => ({...state, isLoading: true})),
    on(Actions.loginSuccess, (state, {user}) => ({...state, user: user, isLoading: false, isAuthenticated: true})),
    on(Actions.loginFailure, (state) => ({...state, isLoading: false, isAuthenticated: false}))
)
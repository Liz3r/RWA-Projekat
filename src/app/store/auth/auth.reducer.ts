import { createReducer, on } from "@ngrx/store";
import { User } from "../../../models/user";
import * as Actions from './auth.actions';


export interface AuthState{
    isAuthenticated: boolean | null,
    isLoading: boolean,
    user: User | null
}

export const initialAuthState: AuthState = {
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export const authReducer = createReducer(
    initialAuthState,
    //login
    on(Actions.login, (state) => ({...state, isLoading: true})),
    on(Actions.loginSuccess, (state, {user}) => ({...state, user: user, isLoading: false, isAuthenticated: true})),
    on(Actions.loginFailure, (state) => ({...state, isLoading: false, isAuthenticated: false, user: null})),
    on(Actions.logout, (state) => { document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; return {...state, isAuthenticated: false, user: null}}),
    //register
    on(Actions.register, (state) => state),
    on(Actions.registerSuccess, (state) => state),
    on(Actions.registerFailure, (state) => state),
    //token
    on(Actions.checkToken, (state) => ({...state, isLoading: true})),
    on(Actions.validToken, (state, {user}) => ({...state, isLoading: false, isAuthenticated: true, user: user})),
    on(Actions.invalidToken, (state) => ({...state, isLoading: false, isAuthenticated: false, user: null})),
    //load profile
    on(Actions.loadFullProfile, (state) => ({...state, isLoading: true})),
    on(Actions.loadProfileSucceeded, (state, {user}) => ({...state, isLoading: false, user: user})),
    on(Actions.loadProfileFailed, (state) => ({...state, isLoading: false})),
    //update profile
    on(Actions.updateProfile, (state) => ({...state, isLoading: true})),
    on(Actions.updateProfileSucceeded, (state, {user}) => ({...state, user: user, isLoading: false})),
    on(Actions.updateProfileFailed, (state) => ({...state, isLoading: false}))
)
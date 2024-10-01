import { createReducer, on } from "@ngrx/store";
import * as Actions from './server-success.actions';

export interface ServerMessageState{
    message: string | null;
}

export const InitialMessageState: ServerMessageState = {
    message: null
};

export const serverMessageReducer = createReducer(
    InitialMessageState,
    on(Actions.setMessage, (state, {message}) => ({...state, message: message})),
    on(Actions.clearMessage, state => ({...state, message: null}))
)
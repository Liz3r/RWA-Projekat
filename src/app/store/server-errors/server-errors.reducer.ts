import { createReducer, on } from "@ngrx/store";
import * as Actions from "./server-errors.actions";

export interface ErrorState{
    status: number | null;
    message: string | null;
}

export const InitialErrorState: ErrorState = {
    status: null,
    message: null
};

export const serverErrorReducer = createReducer(
    InitialErrorState,
    on(Actions.setError, (state, {status, message}) => ({...state, status: status, message: message})),
    on(Actions.clearError, state => ({...state, status: null, message: null}))
)
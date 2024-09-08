import { createReducer, on } from "@ngrx/store";
import * as Actions from "./server-errors.actions";

export interface ErrorState{
    status: number;
    message: string;
}

export const InitialErrorState: ErrorState = {
    status: 200,
    message: ""
};

export const serverErrorReducer = createReducer(
    InitialErrorState,
    on(Actions.setError, (state, {status, message}) => {return {status: status, message: message}}),
    on(Actions.clearError, state => {return {status: 200, message: ""}})
)
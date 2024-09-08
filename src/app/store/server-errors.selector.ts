import { createSelector } from "@ngrx/store";
import { AppState } from "./app-state";
import { ErrorState } from "./server-errors.reducer";


export const selectCurrentErrorMessage = createSelector(
    (state: AppState) => state.serverErrors,
    (error) => error.message
);


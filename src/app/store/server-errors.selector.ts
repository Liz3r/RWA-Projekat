import { createSelector } from "@ngrx/store";
import { AppState } from "./app-state";

export const selectServerErrorsFeature = (state:AppState) => state.serverErrors;

export const selectCurrentErrorMessage = createSelector(
    selectServerErrorsFeature,
    (serverErrors) => serverErrors.message
);


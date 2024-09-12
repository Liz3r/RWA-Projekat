import { createSelector } from "@ngrx/store";
import { AppState } from "../app-state";


export const selectAuthFeature = (state: AppState) => state.auth;

export const selectIsLoading= createSelector(
    selectAuthFeature,
    (authState) => authState.isLoading
);

export const selectIsAuthenticated = createSelector(
    selectAuthFeature,
    (authState) => authState.isAuthenticated
);

export const selectAuthUser = createSelector(
    selectAuthFeature,
    (authState) => authState.user
);


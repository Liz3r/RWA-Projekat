import { createSelector } from "@ngrx/store";
import { AppState } from "../app-state";


export const selectCategoriesFeature = (state: AppState) => state.categories;

export const selectCategoriesList = createSelector(
    selectCategoriesFeature,
    (CategoryState) => CategoryState.categories
)
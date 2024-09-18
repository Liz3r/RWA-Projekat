import { createReducer, on } from "@ngrx/store";
import { Category } from "../../../models/category";
import * as Actions from "./category.actions";


export interface CategoryState{
    categories: Category[],
    isLoading:  boolean
}

export const InitialCategoryState: CategoryState = {
    categories: [],
    isLoading: false
}

export const CategoryReducer = createReducer(
    InitialCategoryState,
    on(Actions.fetchCategories, (state) => ({...state, isLoading: true})),
    on(Actions.fetchSuccess, (state, {categories}) => ({...state,isLoading: false, categories: categories})),
    on(Actions.fetchFailure, (state) => ({...state, isLoading: false})),
)
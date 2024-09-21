
import { createReducer, on } from "@ngrx/store";
import { Category } from "../../../models/category";
import * as Actions from "./announcement.actions";


export interface AnnouncementState{
    categories: Category[],
    isLoading:  boolean
}

export const InitialAnnouncementState: AnnouncementState = {
    categories: [],
    isLoading: false
}

export const AnnouncementReducer = createReducer(
    InitialAnnouncementState,
    on(Actions.loadCategories, (state) => ({...state, isLoading: true})),
    on(Actions.loadCategoriesSuccess, (state, {categories}) => ({...state, categories: categories})),
    on(Actions.loadCategoriesFailure, (state) => ({...state, categories: []})),
)
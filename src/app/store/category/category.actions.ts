import { createAction, props } from "@ngrx/store";
import { Category } from "../../../models/category";


export const fetchCategories = createAction(
    '[Categories] Load Categories'
);

export const fetchSuccess = createAction(
    '[Categories] Loading Succeeded',
    props<{categories: Category[]}>()
);

export const fetchFailure = createAction(
    '[Categories] Loading Failed'
);

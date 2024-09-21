import { createAction, props } from "@ngrx/store";
import { Category } from "../../../models/category";


export const loadCategories = createAction(
    '[Announcements] Load Categories'
);

export const loadCategoriesSuccess = createAction(
    '[Announcements] Loading Succeeded',
    props<{categories: Category[]}>()
);

export const loadCategoriesFailure = createAction(
    '[Announcements] Loading Failed'
);

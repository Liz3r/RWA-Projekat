import { createAction, props } from "@ngrx/store";
import { Category } from "../../../models/category";
import { Announcement } from "../../../models/announcement";


//category actions
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

//Announcement actions

//Category not selected - search string empty
export const loadAnnouncementsPageAll = createAction(
    '[All Announcements] Load Page',
    props<{page: number}>()
)

export const loadAnnouncementsPageSuccess = createAction(
    '[All Announcements] Loading Succeeded',
    props<{items: Announcement[]}>()
)

export const loadAnnouncementsPageFailure = createAction(
    '[All Announcements] Loading Failed'
)

//Category selected -


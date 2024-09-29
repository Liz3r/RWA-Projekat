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

export const selectCategory = createAction(
    '[Announcements] Select Category',
    props<{categId: number | null}>()
)

export const selectCategorySuccess = createAction(
    '[Announcements] Select Category Succeeded',
    props<{items: Announcement[], newSelectedPage: number, count: number,categId: number | null}>()
);


export const selectCategoryFailure = createAction(
    '[Announcements] Select Category Failed'
);


//Announcement actions

//Category not selected - search string empty
export const loadAnnouncementsPageAll = createAction(
    '[All Announcements] Load Page',
    props<{page: number}>()
)

export const loadAnnouncementsPageSuccess = createAction(
    '[All Announcements] Loading Succeeded',
    props<{items: Announcement[], newSelectedPage: number, count: number}>()
)

export const loadAnnouncementsPageFailure = createAction(
    '[All Announcements] Loading Failed'
)

export const loadAnnouncementPageFromCache = createAction(
    '[All Announcements] Loaded From Cache',
    props<{newSelectedPage: number}>()
)

export const resetCache = createAction(
    '[All Announcements] Reset Cache'
)
//Category selected -


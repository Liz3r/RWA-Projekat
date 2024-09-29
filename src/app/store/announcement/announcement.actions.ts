import { createAction, props } from "@ngrx/store";
import { Category } from "../../../models/category";
import { Announcement } from "../../../models/announcement";


//category actions
export const loadCategories = createAction(
    '[Category] Load Categories'
);

export const loadCategoriesSuccess = createAction(
    '[Category] Loading Succeeded',
    props<{categories: Category[]}>()
);

export const loadCategoriesFailure = createAction(
    '[Category] Loading Failed'
);

export const selectCategory = createAction(
    '[Category] Select Category',
    props<{categId: number | null}>()
)

export const selectCategorySuccess = createAction(
    '[Category] Select Succeeded',
    props<{items: Announcement[], newSelectedPage: number, count: number,categId: number | null}>()
);


export const selectCategoryFailure = createAction(
    '[Category] Select Failed'
);


//Announcement actions

//Category not selected - search string empty
export const loadAnnouncementsPageAll = createAction(
    '[Announcements] Load Page',
    props<{page: number}>()
)

export const loadAnnouncementsPageSuccess = createAction(
    '[Announcements] Loading Succeeded',
    props<{items: Announcement[], newSelectedPage: number, count: number}>()
)

export const loadAnnouncementsPageFailure = createAction(
    '[Announcements] Loading Failed'
)

export const loadAnnouncementPageFromCache = createAction(
    '[Announcements] Loaded From Cache',
    props<{newSelectedPage: number}>()
)

//search

export const searchAnnouncements = createAction(
    '[Announcements] Search',
    props<{search: string}>()
)

export const searchAnnouncementsSuccess = createAction(
    '[Announcements] Search Succeeded',
    props<{items: Announcement[], newSelectedPage: number, count: number, categId: number | null, search: string | null}>()
)

export const searchAnnouncementsFailure = createAction(
    '[Announcements] Search Failed'
)

export const resetCache = createAction(
    '[Cache] Reset Cache'
)
//Category selected -


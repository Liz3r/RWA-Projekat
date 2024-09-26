import { createSelector } from "@ngrx/store";
import { AppState } from "../app-state";


export const selectAnnouncementFeature = (state: AppState) => state.announcements;

export const selectCategoriesList = createSelector(
    selectAnnouncementFeature,
    (announcementState) => announcementState.categories
)

export const selectedCategory = createSelector(
    selectAnnouncementFeature,
    (annState) => annState.selectedCategoryId
)

export const selectPagesInfo = createSelector(
    selectAnnouncementFeature,
    (annState) => annState.pagesInfo
)

export const selectCurrentPage = createSelector(
    selectAnnouncementFeature,
    (annState) => annState.entities
)
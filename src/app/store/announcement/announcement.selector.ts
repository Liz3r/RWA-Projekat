import { createSelector } from "@ngrx/store";
import { AppState } from "../app-state";
import { adapter } from "./announcement.reducer";
import { Announcement } from "../../../models/announcement";


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
    (annState) => Object.values(annState.entities)
    .filter(ann => ann != null)
    .filter((ann) => (ann?.page === annState.pagesInfo.selectedPage)? <Announcement>ann : false) // selektuju se samo entiteti aktivne stranice
)


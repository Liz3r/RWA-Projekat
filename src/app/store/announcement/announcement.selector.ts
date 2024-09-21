import { createSelector } from "@ngrx/store";
import { AppState } from "../app-state";


export const selectAnnouncementFeature = (state: AppState) => state.announcements;

export const selectCategoriesList = createSelector(
    selectAnnouncementFeature,
    (announcementState) => announcementState.categories
)
import { createSelector } from "@ngrx/store";
import { AppState } from "../app-state";


export const selectAnnouncementDetailsFeature = (state: AppState) => state.announcementDetails;

export const selectAnnouncementDetails = createSelector(
    selectAnnouncementDetailsFeature,
    (announcementDetailsFeature) => announcementDetailsFeature.announcementDetails
)

export const selectIsLoadingAnnouncementDetails = createSelector(
    selectAnnouncementDetailsFeature,
    (announcementDetailsFeature) => announcementDetailsFeature.isLoading
)
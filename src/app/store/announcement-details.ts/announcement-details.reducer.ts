import { createReducer, on } from "@ngrx/store";
import { AnnouncementDetails } from "../../../models/announcement-details";
import * as Actions from './announcement-details.actions';

export interface AnnouncementDetailsState{
    announcementDetails: AnnouncementDetails | null,
    isLoading: boolean
}

export const InitAnnouncementDetailsState: AnnouncementDetailsState = {
    announcementDetails: null,
    isLoading: false
}

export const announcementDetailsReducer = createReducer(
    InitAnnouncementDetailsState,
    on(Actions.loadAnnouncementDetails, (state) => ({...state, isLoading: true})),
    on(Actions.loadAnnouncementDetailsSucceeded, (state, {announcementDetails}) => ({...state, isLoading: false, announcementDetails})),
    on(Actions.loadAnnouncementDetailsFailed, (state) => ({...state, isLoading: false}))
)
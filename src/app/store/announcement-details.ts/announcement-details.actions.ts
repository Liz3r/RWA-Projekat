import { createAction, props } from "@ngrx/store";
import { AnnouncementDetails } from "../../../models/announcement-details";



export const loadAnnouncementDetails = createAction(
    '[Announcement Details] Load Details',
    props<{id: number}>()
)

export const loadAnnouncementDetailsSucceeded = createAction(
    '[Announcement Details] Load Details Succeeded',
    props<{announcementDetails: AnnouncementDetails}>()
)

export const loadAnnouncementDetailsFailed = createAction(
    '[Announcement Details] Load Details Failed'
)

export const clearDetailsSelection = createAction(
    '[Announcement Details] Clear Selection'
)
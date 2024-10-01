import { AnnouncementDetailsState } from "./announcement-details.ts/announcement-details.reducer";
import { AnnouncementState } from "./announcement/announcement.reducer";
import { AuthState } from "./auth/auth.reducer";

import { ErrorState } from "./server-errors/server-errors.reducer";
import { ServerMessageState } from "./server-success/server-success.reducer";


export interface AppState{
    serverErrors: ErrorState
    auth: AuthState
    announcements: AnnouncementState,
    announcementDetails: AnnouncementDetailsState,
    serverMessage: ServerMessageState
}

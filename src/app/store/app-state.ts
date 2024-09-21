import { AnnouncementState } from "./announcement/announcement.reducer";
import { AuthState } from "./auth/auth.reducer";

import { ErrorState } from "./server-errors/server-errors.reducer";


export interface AppState{
    serverErrors: ErrorState
    auth: AuthState
    announcements: AnnouncementState
}

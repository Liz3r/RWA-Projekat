import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "../app-state";
import { Store } from "@ngrx/store";
import { AnnouncementService } from "../../services/announcement.service";
import { withLatestFrom, switchMap, of, map, catchError } from "rxjs";
import { selectedCategory, selectPagesInfo, selectSearchString } from "../announcement/announcement.selector";
import * as AnnouncementDetailsActions from './announcement-details.actions';



@Injectable()
export class AnnouncementEffects{

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private announcementService: AnnouncementService
    ){}


    loadingAnnouncementsPageAll$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementDetailsActions.loadAnnouncementDetails),
        switchMap(({id}) => this.announcementService.getAnnouncementDetails(id).pipe(
                map((announcement) => AnnouncementDetailsActions.loadAnnouncementDetailsSucceeded({announcementDetails: announcement})),
                catchError((err) => of(AnnouncementDetailsActions.loadAnnouncementDetailsFailed()))
            )
        )
    ))
}
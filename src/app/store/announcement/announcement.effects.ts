import { Injectable } from "@angular/core";
import { AppState } from "../app-state";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AnnouncementActions from "./announcement.actions";
import { CategoryService } from "../../services/category.service";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { selectedCategory, selectPagesInfo, selectSearchString } from "./announcement.selector";
import { AnnouncementService } from "../../services/announcement.service";


@Injectable()
export class AnnouncementEffects{

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private categoryService: CategoryService,
        private announcementService: AnnouncementService
    ){}

    loadingAnnouncementsPageAll$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementActions.loadAnnouncementsPageAll),
        withLatestFrom(this.store.select(selectedCategory), this.store.select(selectPagesInfo), this.store.select(selectSearchString)),
        switchMap(([{page},selectedCateg, pagesInfo, search]) => {
            if(page < 0)
                return of(AnnouncementActions.loadAnnouncementsPageFailure());

            if(pagesInfo.presentPages.includes(page))
                return of(AnnouncementActions.loadAnnouncementPageFromCache({newSelectedPage: page}));

            return this.announcementService.getAnnouncementsPageSearch(page, pagesInfo.itemsPerPage, selectedCateg, search).pipe(
                map(({announcements,count}) => {
                    announcements.forEach(ann => {ann.page = Number(ann.page); ann.datePosted = new Date(ann.datePosted); return ann});
                    return AnnouncementActions.loadAnnouncementsPageSuccess({items: announcements, newSelectedPage: page, count: count});
                }),
                catchError((err) => {
                    return of(AnnouncementActions.loadAnnouncementsPageFailure())
                })
            );
        })
    ))

    loadingCategories$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AnnouncementActions.loadCategories),
            switchMap(() => 
                this.categoryService.getAllCategories().pipe(
                    map((categories) => {
                        if(!categories)
                            return AnnouncementActions.loadCategoriesFailure()
                        if(!categories[Symbol.iterator])
                            return AnnouncementActions.loadCategoriesFailure()
                        return AnnouncementActions.loadCategoriesSuccess({categories: categories});
                    }),
                    catchError((err) => {
                        return of(AnnouncementActions.loadCategoriesFailure())
                    })
                )
            )
        )
    )
}
import { Injectable } from "@angular/core";
import { AppState } from "../app-state";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AnnouncementActions from "./announcement.actions";
import { CategoryService } from "../../services/category.service";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { selectedCategory, selectPagesInfo } from "./announcement.selector";
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
        withLatestFrom(this.store.select(selectedCategory), this.store.select(selectPagesInfo)),
        switchMap(([{page},selectedCateg, pagesInfo]) => {
            if(page < 0)
                return of(AnnouncementActions.loadAnnouncementsPageFailure());

            if(pagesInfo.presentPages.includes(page))
                return of(AnnouncementActions.loadAnnouncementPageFromCache({newSelectedPage: page}));
            
            if(selectedCateg === null){
                return this.announcementService.getAnnouncementsPageAll(page, pagesInfo.itemsPerPage).pipe(
                    map(({announcements,count}) => {
                        announcements.forEach(ann => {ann.page = Number(ann.page); ann.datePosted = new Date(ann.datePosted); return ann});
                        return AnnouncementActions.loadAnnouncementsPageSuccess({items: announcements, newSelectedPage: page, count: count})
                    }),
                    catchError((err) => {
                        return of(AnnouncementActions.loadAnnouncementsPageFailure())
                    })
                );
            }else{
                return this.announcementService.getAnnouncementsPageCategory(page, pagesInfo.itemsPerPage, selectedCateg).pipe(
                    map(({announcements,count}) => {
                        announcements.forEach(ann => {ann.page = Number(ann.page); ann.datePosted = new Date(ann.datePosted); return ann});
                        return AnnouncementActions.loadAnnouncementsPageSuccess({items: announcements, newSelectedPage: page, count: count})
                    }),
                    catchError((err) => {
                        return of(AnnouncementActions.loadAnnouncementsPageFailure())
                    })
                );
            }
        })
    ))

    selectCategory$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementActions.selectCategory),
        withLatestFrom(this.store.select(selectPagesInfo)),
        switchMap(([{categId}, pagesInfo]) => {
            return this.announcementService.getAnnouncementsPageCategory(0, pagesInfo.itemsPerPage, categId).pipe(
                map(({announcements,count}) => {
                    announcements.forEach(ann => {ann.page = Number(ann.page); ann.datePosted = new Date(ann.datePosted); return ann});
                    return AnnouncementActions.selectCategorySuccess({items: announcements, newSelectedPage: 0, count: count,categId: categId});
                }),
                catchError((err) => {
                    return of(AnnouncementActions.selectCategoryFailure())
                })
            );
        })
    ))

    // searchAnnouncements$ = createEffect(() => this.actions$.pipe(
    //     ofType(AnnouncementActions.searchAnnouncements),
    //     withLatestFrom(this.store.select(selectPagesInfo), this.store.select(selectedCategory)),
    //     switchMap(([{search}, pagesInfo, selectedCateg]) => {
    //         //----
    //         return this.announcementService.getAnnouncementsPageCategory(0, pagesInfo.itemsPerPage, categId).pipe(
    //             map(({announcements,count}) => {
    //                 announcements.forEach(ann => {ann.page = Number(ann.page); ann.datePosted = new Date(ann.datePosted); return ann});
    //                 return AnnouncementActions.selectCategorySuccess({items: announcements, newSelectedPage: 0, count: count,categId: categId});
    //             }),
    //             catchError((err) => {
    //                 return of(AnnouncementActions.selectCategoryFailure())
    //             })
    //         );
    //         //---
    //     })
    // ))

    loadingCategories$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AnnouncementActions.loadCategories),
            switchMap(() => 
                this.categoryService.getAllCategories().pipe(
                    map((categories) => {
                        //console.log(categories);
                        //provera da li vraceni objekat nije null
                        if(!categories)
                            return AnnouncementActions.loadCategoriesFailure()
                        //provera da li je vraceni objekat iteratable
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
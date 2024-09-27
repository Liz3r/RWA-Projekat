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
            console.log("from effect");
            //if(selectedCateg === null){
                return this.announcementService.getAnnouncementsPageAll(page, pagesInfo.itemsPerPage).pipe(
                    map((announcements) => {
                        announcements.forEach(ann => ann.page = Number(ann.page));
                        console.log(announcements);
                        if(announcements.length == 0)
                            return AnnouncementActions.loadAnnouncementsPageFailure()
                        return AnnouncementActions.loadAnnouncementsPageSuccess({items: announcements, newSelectedPage: page})
                    }),
                    catchError((err) => {
                        return of(AnnouncementActions.loadAnnouncementsPageFailure())
                    })
                );
            //}else{

            //}
        })
    ))

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
                        //provera da li su svi clanovi niza imaju id i title
                        
                        // for(let i = 0; i < categories.length; i++){
                        //     if(typeof(categories[i].id) !== 'number' || typeof(categories[i].title) !== 'string')
                        //         return CategoryActions.fetchFailure()
                        // }
                        // console.log(categories);
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
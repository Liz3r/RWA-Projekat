import { Injectable } from "@angular/core";
import { AppState } from "../app-state";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CategoryActions from "./announcement.actions";
import { CategoryService } from "../../services/category.service";
import { catchError, map, of, switchMap } from "rxjs";


@Injectable()
export class AnnouncementEffects{

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private categoryService: CategoryService
    ){}

    loadingCategories$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CategoryActions.loadCategories),
            switchMap(() => 
                this.categoryService.getAllCategories().pipe(
                    map((categories) => {
                        //console.log(categories);
                        //provera da li vraceni objekat nije null
                        if(!categories)
                            return CategoryActions.loadCategoriesFailure()
                        //provera da li je vraceni objekat iteratable
                        if(!categories[Symbol.iterator])
                            return CategoryActions.loadCategoriesFailure()
                        //provera da li su svi clanovi niza imaju id i title
                        
                        // for(let i = 0; i < categories.length; i++){
                        //     if(typeof(categories[i].id) !== 'number' || typeof(categories[i].title) !== 'string')
                        //         return CategoryActions.fetchFailure()
                        // }
                        // console.log(categories);
                        return CategoryActions.loadCategoriesSuccess({categories: categories});
                    }),
                    catchError((err) => {
                        return of(CategoryActions.loadCategoriesFailure())
                    })
                )
            )
        )
    )
}
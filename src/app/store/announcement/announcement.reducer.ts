
import { createReducer, on } from "@ngrx/store";
import { Category } from "../../../models/category";
import * as Actions from "./announcement.actions";
import { CacheInfo } from "../../../models/cacheInfo";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Announcement } from "../../../models/announcement";

//---------pomocna struktura za rad sa kesiranjem stranica
export const InitCacheInfo: CacheInfo = {
    presentPages: [],
    lastPageIndex: 0,
    itemsPerPage: 7,
    cachedPagesLimit: 5,
    selectedPage: 0
}
//------------------

export const adapter: EntityAdapter<Announcement> = createEntityAdapter<Announcement>();

export interface AnnouncementState extends EntityState<Announcement>{
    categories: Category[],
    selectedCategoryId: number | null,
    isLoading:  boolean,
    pagesInfo: CacheInfo
}

export const InitialAnnouncementState: AnnouncementState = adapter.getInitialState({
    categories: [],
    selectedCategoryId: null,
    isLoading: false,
    pagesInfo: InitCacheInfo
})

export const AnnouncementReducer = createReducer(
    InitialAnnouncementState,
    on(Actions.loadCategories, (state) => ({...state, isLoading: true})),
    on(Actions.loadCategoriesSuccess, (state, {categories}) => ({...state, categories: categories})),
    on(Actions.loadCategoriesFailure, (state) => ({...state, categories: []})),
    on(Actions.loadAnnouncementsPageAll, (state) => ({...state, isLoading: true})),
    on(Actions.loadAnnouncementsPageSuccess, (state, 
        {items, newSelectedPage}) => adapter.addMany(items, {...state, isLoading: false, pagesInfo: {...state.pagesInfo, selectedPage: newSelectedPage}})),
    on(Actions.loadAnnouncementsPageFailure, (state) => ({...state, isLoading: false}))
)
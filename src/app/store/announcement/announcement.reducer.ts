
import { createReducer, on } from "@ngrx/store";
import { Category } from "../../../models/category";
import * as Actions from "./announcement.actions";
import { CacheInfo } from "../../../models/cacheInfo";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Announcement } from "../../../models/announcement";

//---------pomocna struktura za rad sa kesiranjem stranica
const  cachedPagesCount = 5;

export const InitCacheInfo: CacheInfo = {
    presentPages: new Array(cachedPagesCount).fill(null),
    lastPageIndex: 0,
    itemsPerPage: 2,
    cachedPagesLimit: cachedPagesCount,
    selectedPage: 0,
    totalItems: null
}
//------------------

export const adapter: EntityAdapter<Announcement> = createEntityAdapter<Announcement>();

export interface AnnouncementState extends EntityState<Announcement>{
    categories: Category[],
    selectedCategoryId: number | null,
    searchString: string | null,
    isLoading:  boolean,
    pagesInfo: CacheInfo
}

export const InitialAnnouncementState: AnnouncementState = adapter.getInitialState({
    categories: [],
    selectedCategoryId: null,
    searchString: null,
    isLoading: false,
    pagesInfo: InitCacheInfo
})

export const AnnouncementReducer = createReducer(
    InitialAnnouncementState,
    on(Actions.loadCategories, (state) => ({...state, isLoading: true})),
    on(Actions.loadCategoriesSuccess, (state, {categories}) => ({...state, categories: categories})),
    on(Actions.loadCategoriesFailure, (state) => ({...state, categories: []})),
    on(Actions.loadAnnouncementsPageAll, (state) => ({...state, isLoading: true})),
    on(Actions.loadAnnouncementsPageSuccess, 
        (state, {items, newSelectedPage, count}) => {
            let newPagesInfo: CacheInfo = {...state.pagesInfo };
            newPagesInfo.selectedPage = newSelectedPage;
            if(newPagesInfo.lastPageIndex >= newPagesInfo.cachedPagesLimit)
                newPagesInfo.lastPageIndex = 0;
            else
                newPagesInfo.lastPageIndex = newPagesInfo.lastPageIndex+1;
            
            let presentPagesUpdated = [...newPagesInfo.presentPages];
            presentPagesUpdated[newPagesInfo.lastPageIndex] = newSelectedPage;
            newPagesInfo.presentPages = presentPagesUpdated;
            newPagesInfo.totalItems = count;

            return adapter.addMany(items, {...state, isLoading: false, pagesInfo: newPagesInfo});
        }),
    on(Actions.loadAnnouncementsPageFailure, (state) => ({...state, isLoading: false})),
    on(Actions.loadAnnouncementPageFromCache, (state, {newSelectedPage}) => ({...state, pagesInfo: {...state.pagesInfo, selectedPage: newSelectedPage}})),
    on(Actions.selectCategory, (state) => ({...state})),
    on(Actions.selectCategorySuccess, (state, {items, newSelectedPage, count, categId}) => {
        let newPagesInfo: CacheInfo = {...InitCacheInfo};
        let presentPagesUpdated = [...newPagesInfo.presentPages];
        presentPagesUpdated[0] = newSelectedPage;
        newPagesInfo.presentPages = presentPagesUpdated;
        newPagesInfo.totalItems = count;
        
        return adapter.addMany(items, {...state, isLoading: false, pagesInfo: newPagesInfo, selectedCategoryId: categId});
    }),
    on(Actions.selectCategoryFailure, (state) => state),
    on(Actions.resetCache, (state) => adapter.removeAll({...state, pagesInfo: InitCacheInfo}))//{...state, pagesInfo: InitCacheInfo})
)
export interface CacheInfo{
    presentPages: number[],
    lastPageIndex: number,
    itemsPerPage: number,
    cachedPagesLimit: number ,
    selectedPage: number,
    totalItems: number | null
}

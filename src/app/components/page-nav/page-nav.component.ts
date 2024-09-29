import { Component, OnInit } from '@angular/core';
import { filter, Observable, Subscription } from 'rxjs';
import { CacheInfo } from '../../../models/cacheInfo';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { selectPagesInfo } from '../../store/announcement/announcement.selector';
import { loadAnnouncementsPageAll } from '../../store/announcement/announcement.actions';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrl: './page-nav.component.scss'
})
export class PageNavComponent implements OnInit{


  cacheInfoSub$!: Subscription;

  pagesTotal!: number;
  selectedPage!: number;
  pages!: Array<{value: number, text: number}>;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.cacheInfoSub$ = this.store.select(selectPagesInfo)
    .subscribe((cacheInfo) => {
      if(cacheInfo.totalItems === null)
        return;

      if(cacheInfo.totalItems !== 0)
        this.pagesTotal = Math.ceil(cacheInfo.totalItems/cacheInfo.itemsPerPage);
      else
        this.pagesTotal = 1;
      this.selectedPage = cacheInfo.selectedPage;
      this.pages = Array(this.pagesTotal).fill(0).map((n,i) => ({value: i, text: i+1}));
    });
  }

 
  selectPage(page: number){
    this.store.dispatch(loadAnnouncementsPageAll({page}));
  }

}

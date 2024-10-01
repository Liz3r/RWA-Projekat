import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../../store/app-state';
import { select, Store } from '@ngrx/store';
import { loadAnnouncementsPageAll, loadCategories, resetCache, searchAnnouncements, selectCategory } from '../../../store/announcement/announcement.actions';
import { Announcement } from '../../../../models/announcement';
import { from, map, Observable, of, Subscriber, Subscription, switchMap, withLatestFrom } from 'rxjs';
import { selectAllEntities, selectCategoriesList, selectCurrentPage, selectedCategory, selectedPage } from '../../../store/announcement/announcement.selector';
import { Category } from '../../../../models/category';
import { User } from '../../../../models/user';
import { selectAuthUser } from '../../../store/auth/auth.selector';
import { logout } from '../../../store/auth/auth.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  constructor(private router: Router, private store: Store<AppState>){}
  

  announcements$!: Observable<Announcement[]>;
  allCategories$!: Observable<Category[]>;
  selectedCategoryId!: number | null;
  inputVal: string = '';
  userInfo$!: Observable<User | null>;
  entityCount: number = 1;

  selectedPageSubscriber!: Subscription;

  ngOnInit(): void {
    this.store.select(selectedCategory).subscribe((categ) => {
      this.selectedCategoryId = categ;
    })
    this.announcements$ = this.store.select(selectCurrentPage);
    this.selectedPageSubscriber = this.store.select(selectedPage).subscribe((page) => {
      this.store.dispatch(loadAnnouncementsPageAll({page: page}));
    })
    
    this.store.select(selectAllEntities).subscribe((allEntites) => {this.entityCount = allEntites.length})
    this.store.dispatch(loadCategories());
    this.allCategories$ = this.store.select(selectCategoriesList);
    this.userInfo$ = this.store.select(selectAuthUser);
  }
  ngOnDestroy(): void {
    this.selectedPageSubscriber.unsubscribe();
  }

  selectCategory(id: number | null){
    this.store.dispatch(resetCache());
    this.store.dispatch(selectCategory({categId: id}));
    this.store.dispatch(loadAnnouncementsPageAll({page: 0}));
  }

  onSearch(){
    this.store.dispatch(resetCache());
    this.store.dispatch(searchAnnouncements({search: this.inputVal}));
    this.store.dispatch(loadAnnouncementsPageAll({page: 0}));
  }

  goToAccountSettings() {
    this.router.navigate(['/authenticated/account'])
  }

  onAddNewAnnouncement(){
    this.router.navigate(['/authenticated/add']);
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['account/login'])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../../store/app-state';
import { select, Store } from '@ngrx/store';
import { loadAnnouncementsPageAll, loadCategories } from '../../../store/announcement/announcement.actions';
import { Announcement } from '../../../../models/announcement';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { selectCategoriesList, selectCurrentPage } from '../../../store/announcement/announcement.selector';
import { Category } from '../../../../models/category';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router, private store: Store<AppState>){}

  announcements$!: Observable<Announcement[]>;
  allCategories$!: Observable<Category[]>;
  
  ngOnInit(): void {
    this.announcements$ = this.store.select(selectCurrentPage);
    this.store.select(selectCurrentPage).subscribe(el => console.log(el));
    this.store.dispatch(loadAnnouncementsPageAll({page: 0}));
    this.store.dispatch(loadCategories());
    this.allCategories$ = this.store.select(selectCategoriesList);
  }

  onAddNewAnnouncement(){
    this.router.navigate(['/authenticated/add']);
  }
}

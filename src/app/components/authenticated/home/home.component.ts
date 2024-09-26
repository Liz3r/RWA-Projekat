import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import { loadAnnouncementsPageAll, loadCategories } from '../../../store/announcement/announcement.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router, private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.dispatch(loadAnnouncementsPageAll({page: 0}));
  }

  onAddNewAnnouncement(){
    this.router.navigate(['/authenticated/add']);
  }
}

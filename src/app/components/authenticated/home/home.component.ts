import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import { loadCategories } from '../../../store/announcement/announcement.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router, private store: Store<AppState>){}

  onAddNewAnnouncement(){
    this.router.navigate(['/authenticated/add']);
  }
}

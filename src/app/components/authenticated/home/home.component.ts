import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import { fetchCategories } from '../../../store/category/category.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router, private store: Store<AppState>){}

  onAddNewAnnouncement(){
    this.store.dispatch(fetchCategories());
    this.router.navigate(['/authenticated/add']);
  }
}

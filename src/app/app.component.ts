import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { checkToken } from './store/auth/auth.actions';
import { AppState } from './store/app-state';
import { NavigationStart, Router } from '@angular/router';
import { filter, of, combineLatest, switchMap, take } from 'rxjs';
import { selectIsAuthenticated } from './store/auth/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  title = 'RWA-Projekat';
  
  constructor(private store: Store<AppState>, private router: Router){}
  
  ngOnInit(): void {
  
  }

}

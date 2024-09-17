import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkToken } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  title = 'RWA-Projekat';
  
  constructor(private store: Store){}
  
  ngOnInit(): void {
    //this.store.dispatch(checkToken());
  }

}

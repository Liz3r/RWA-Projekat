import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { from, map, Observable, of, switchMap, take } from 'rxjs';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import { fetchCategories } from '../../../store/category/category.actions';
import { selectCategoriesList } from '../../../store/category/category.selector';
import { Category } from '../../../../models/category';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.scss'
})
export class AddAnnouncementComponent implements OnInit{
  
  allCategories$!: Observable<Category[]>;

  constructor(private router:Router, private store: Store<AppState>){
    
  }
  ngOnInit(): void {
    this.allCategories$ = this.store.select(selectCategoriesList);
  }

  newAnnouncementForm = new FormGroup({
    picture: new FormControl<string>('',[]),
    title: new FormControl<string>('',[]),
    currency: new FormControl<String>('din',[]),
    condition: new FormControl<String>('new',[]),
    price: new FormControl<String>('',[]),
    description: new FormControl<String>('',[]),
  });


  onLogoClick(){
    this.router.navigate(['authenticated/home']);
  }
}

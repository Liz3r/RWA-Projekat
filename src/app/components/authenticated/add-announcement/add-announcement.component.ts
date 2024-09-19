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
  errMsg: string = '';
  file!: File | null;
  pictureData: String | null = null;
  
  constructor(private router:Router, private store: Store<AppState>){
    
  }
  ngOnInit(): void {
    this.allCategories$ = this.store.select(selectCategoriesList);
  }

  newAnnouncementForm = new FormGroup({
    picture: new FormControl<File | null>(null,[]),
    title: new FormControl<string>('',[]),
    currency: new FormControl<String>('din',[]),
    condition: new FormControl<String>('new',[]),
    price: new FormControl<String>('',[]),
    description: new FormControl<String>('',[]),
  });


  onImageSelected(event: Event):void {

    if (!event.target)
      return;

    const target = event.target as HTMLInputElement
    if (!target.files) {
      this.errMsg = "No file selected";
      return;
    }
    this.file = target.files[0];

    const types = ["image/png", "image/jpg", "image/jpeg"];

    if(this.file && types.includes(this.file.type) && this.file.size < 1024*1024){ 
      //velicina slike mora biti ispod 400 KB
      this.newAnnouncementForm.patchValue({picture: this.file});

      const reader = new FileReader();
      
      reader.onload = () =>{
        this.pictureData = reader.result as String;
      }
      console.log(this.file.name);
      reader.readAsDataURL(this.file);
    }else{

      this.newAnnouncementForm.patchValue({picture: null});
      this.pictureData = null;
      this.errMsg = this.file.size < 1024*1024? 'File too large (max 1MB)' : 'Invalid format';
      this.file = null;
    }
    console.log(this.file?.size);
  }

  onLogoClick(){
    this.router.navigate(['authenticated/home']);
  }
}

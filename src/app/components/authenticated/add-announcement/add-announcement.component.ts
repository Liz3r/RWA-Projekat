import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, map, Observable, of, switchMap, take } from 'rxjs';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import { Category } from '../../../../models/category';
import { isNumber } from '../../../../helpers/customValidators';
import { checkErrors } from '../../../../helpers/validationErrorMessage';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../env';
import { selectCategoriesList } from '../../../store/announcement/announcement.selector';
import { loadCategories, resetCache } from '../../../store/announcement/announcement.actions';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.scss'
})
export class AddAnnouncementComponent implements OnInit{
  
  allCategories$!: Observable<Category[]>;
  errMsg: string | null = '';
  file!: File | null;
  pictureData: string | null = null;
  
  constructor(private router:Router, private store: Store<AppState>, private http: HttpClient){
    
  }
  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.allCategories$ = this.store.select(selectCategoriesList);
  }

  newAnnouncementForm = new FormGroup({
    picture: new FormControl<File | null>(null,[Validators.required]),
    title: new FormControl<string>('',[Validators.required, Validators.maxLength(75)]),
    currency: new FormControl<string>('rsd',[Validators.required]),
    condition: new FormControl<string>('new',[Validators.required]),
    price: new FormControl<string>('',[Validators.required, isNumber(), Validators.maxLength(10)]),
    description: new FormControl<string>('',[Validators.required, Validators.maxLength(7000)]),
    category: new FormControl<number | null>(null, [Validators.nullValidator])
  });


  onImageSelected(event: Event):void {

    if (!event.target)
      return;
    //jedan megabajt
    const MB = 1024*1024;

    const target = event.target as HTMLInputElement
    if (!target.files) {
      this.errMsg = "No file selected";
      return;
    }
    this.file = target.files[0];

    const types = ["image/png", "image/jpg", "image/jpeg"];

    if(this.file && types.includes(this.file.type) && this.file.size < MB){ 

      this.newAnnouncementForm.patchValue({picture: this.file});

      const reader = new FileReader();
      reader.onload = () =>{
        this.pictureData = reader.result as string;
      }
      console.log(this.file.name);
      reader.readAsDataURL(this.file);
    }else{

      this.newAnnouncementForm.patchValue({picture: null});
      this.pictureData = null;
      this.errMsg = this.file.size < MB? 'File too large (max 1MB)' : 'Invalid format';
      this.file = null;
    }
    console.log(this.file?.size);
  }

  formGroupToFormData(form: FormGroup): FormData{
    const data = new FormData();

    const rawForm = form.getRawValue();
    const keys = Object.keys(rawForm);
    console.log(keys);
    
    keys.forEach(key => {
      let value = rawForm[key];
      data.set(key,value);
    })

    return data;
  }

  onSubmit(){
    this.errMsg = checkErrors(this.newAnnouncementForm);
    //console.log(this.newAnnouncementForm.getRawValue());
    if(this.newAnnouncementForm.valid && !this.errMsg && this.newAnnouncementForm.value.picture){
      const sendData = this.formGroupToFormData(this.newAnnouncementForm);
      
      console.log(this.newAnnouncementForm.value.picture);
      sendData.set('picture', this.newAnnouncementForm.value.picture, this.newAnnouncementForm.value.picture?.name)
      this.http.post(`${API_URL}/announcement/newAnnouncement`, sendData, {withCredentials: true})
      .subscribe((res) => {
        this.newAnnouncementForm.reset();
        this.pictureData = null;
        this.store.dispatch(resetCache());
      });
    }
  }

  onLogoClick(){
    this.router.navigate(['authenticated/home']);
  }
}

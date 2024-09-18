import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.scss'
})
export class AddAnnouncementComponent {
  
  //allCategories$: Observable<string>;

  constructor(private router:Router){}

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

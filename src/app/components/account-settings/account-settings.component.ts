import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumber } from '../../../helpers/customValidators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../store/auth/auth.selector';
import { loadFullProfile } from '../../store/auth/auth.actions';
import { checkErrors } from '../../../helpers/validationErrorMessage';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent implements OnInit{
  
  
  errorMsg: string | null = '';
  userInfo: User | null = null;
  
  constructor(private router: Router, private store: Store<AppState>) {
    
  }
  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe((user) =>{
      if(user){
        const phone_number = user.phone_number? (user.phone_number !== "null"? user.phone_number : '') : '';
        const country = user.country? (user.country !== 'null'? user.country : '') : '';
        const city = user.city? (user.city !== 'null'? user.city : '') : '';
        const address = user.address? (user.address !== 'null'? user.address : '') : '';
        const bio = user.bio? (user.bio !== 'null'? user.bio : '') : '';
        const last_name = user.last_name? (user.last_name !== 'null'? user.last_name : '') : '';
        const first_name = user.first_name? (user.first_name !== 'null'? user.first_name : '') : '';

        //console.log({first_name, last_name, phone_number, country, city, address, bio});
        this.accountSettingsForm.setValue({first_name, last_name, phone_number, country, city, address, bio})
        this.userInfo = {...user, first_name, phone_number, country, city, address, bio };
      }
    });
    this.store.dispatch(loadFullProfile());
  }
  
  accountSettingsForm = new FormGroup({
    first_name: new FormControl<string | null>('',[Validators.required]),
    last_name: new FormControl<string | null>('',[Validators.required]),
    phone_number: new FormControl<string | null>('',[Validators.required]),
    country: new FormControl<string>('',[Validators.required, Validators.maxLength(75)]),
    city: new FormControl<string>('',[Validators.required, Validators.maxLength(75)]),
    address: new FormControl<string>('',[Validators.required, Validators.maxLength(75)]),
    bio: new FormControl<string>('',[Validators.required, Validators.maxLength(75)]),
  });


  onLogoClick() {
    this.router.navigate(['authenticated/home']);
  }
  onSubmit() {
    this.errorMsg = checkErrors(this.accountSettingsForm);
    if(!this.errorMsg){
      
      console.log(this.accountSettingsForm.value);
      
    }
  }
}

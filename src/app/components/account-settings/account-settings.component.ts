import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { atozString, isNumber } from '../../../helpers/customValidators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../store/auth/auth.selector';
import { loadFullProfile } from '../../store/auth/auth.actions';
import { checkErrors } from '../../../helpers/validationErrorMessage';
import * as AuthActions from '../../store/auth/auth.actions';

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
    first_name: new FormControl<string>('',[Validators.required, Validators.maxLength(56), Validators.minLength(4)]),
    last_name: new FormControl<string>('',[Validators.required, Validators.maxLength(56), Validators.minLength(4)]),
    phone_number: new FormControl<string>('',[Validators.required, isNumber()]),
    country: new FormControl<string>('',[Validators.required, Validators.maxLength(56), Validators.minLength(4), atozString()]),
    city: new FormControl<string>('',[Validators.required, Validators.maxLength(75), Validators.minLength(3), atozString()]),
    address: new FormControl<string>('',[Validators.required, Validators.maxLength(75), Validators.minLength(5)]),
    bio: new FormControl<string>('',[Validators.required, Validators.maxLength(250), Validators.minLength(10)]),
  });


  onLogoClick() {
    this.router.navigate(['authenticated/home']);
  }
//   export interface User{
//     id: number;
//     user_email: string;
//     first_name: string;
//     last_name?: string;
//     bio?: string;
//     phone_number?: string;
//     country?: string;
//     city?: string;
//     address?: string;
// }


  onSubmit() {
    this.errorMsg = checkErrors(this.accountSettingsForm);
    if(!this.errorMsg){
      const id = this.userInfo?.id;
      const user_email = this.userInfo?.user_email;
      const first_name = this.accountSettingsForm.get('first_name')?.value;
      const last_name = this.accountSettingsForm.get('last_name')?.value;
      const bio = this.accountSettingsForm.get('bio')?.value;
      const phone_number = this.accountSettingsForm.get('phone_number')?.value;
      const country = this.accountSettingsForm.get('country')?.value;
      const city = this.accountSettingsForm.get('city')?.value;
      const address = this.accountSettingsForm.get('address')?.value;
      
      if(id && user_email && first_name && last_name && bio && phone_number && country && city && address){
        const user: User = {id,user_email,first_name,last_name,bio,phone_number,country,city,address};
        this.store.dispatch(AuthActions.updateProfile({changes: user}));
      }
      
    }
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchPasswords } from '../../../../helpers/customValidators';
import { checkErrors } from '../../../../helpers/validationErrorMessage';
import { CreateUserDto } from '../../../dtos/create-user.dto';
import { Store } from '@ngrx/store';
import * as Actions from '../../../store/server-errors/server-errors.actions';
import { register } from '../../../store/auth/auth.actions';
import { AppState } from '../../../store/app-state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: '../logreg.component.scss'
})
export class RegisterComponent {


  constructor(
    private store: Store<AppState>
  ){}

  errorMsg: string | null = null;

  registerForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.nullValidator,
      Validators.required,
      Validators.email,
      Validators.minLength(8),
      Validators.maxLength(25)
    ]),
    password: new FormControl<string>('', [
      Validators.nullValidator,
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(22),
      
    ]),
    rPassword: new FormControl<string>('', [
      Validators.nullValidator,
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(22)
    ]),
    firstName: new FormControl<string>('', [
      Validators.nullValidator,
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    lastName: new FormControl<string>('', [
      Validators.nullValidator,
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])
  }, { validators: matchPasswords })


  onSubmit(){
    this.errorMsg = checkErrors(this.registerForm);
    if(!this.errorMsg){
      const first_name = this.registerForm.get('firstName')?.value;
      const last_name = this.registerForm.get('lastName')?.value;
      const user_email = this.registerForm.get('email')?.value;
      const user_password = this.registerForm.get('password')?.value;
      
      if(first_name && last_name && user_email && user_password){
        const user: CreateUserDto = { first_name, last_name, user_email, user_password };
        this.store.dispatch(register({createUserDto: user}));
      }
    }
  }

  clearServerError(){
    this.store.dispatch(Actions.clearError());
  }
}

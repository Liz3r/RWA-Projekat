import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkErrors } from '../../../../helpers/validationErrorMessage';
import * as AuthActions from '../../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { clearError } from '../../../store/server-errors/server-errors.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../logreg.component.scss'
})
export class LoginComponent {
  
  constructor(
    private store: Store,
    private router: Router
  ){}

  errorMsg: string | null = null;
    loginForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.nullValidator,
      Validators.required,
      Validators.email,
      Validators.maxLength(25)
    ]),
    password: new FormControl<string>('', [
      Validators.nullValidator,
      Validators.required,
      Validators.maxLength(22)
    ])
  }, [])


  onSubmit(){
    this.errorMsg = checkErrors(this.loginForm);
    if(!this.errorMsg){
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      if(email && password){
        this.store.dispatch(AuthActions.login({username: email, password: password}));
      }
    }
  }

  clearServerError(){
    this.store.dispatch(clearError());
  }
}

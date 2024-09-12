import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkErrors } from '../../../../helpers/validationErrorMessage';
import { AuthService } from '../../../services/auth.service';
import { SignInDto } from '../../../dtos/signIn.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../logreg.component.scss'
})
export class LoginComponent {
  
  constructor(
    private authService: AuthService
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
        const signInDto: SignInDto = {user_email: email, user_password: password};
        this.authService.login(signInDto).subscribe((res)=> console.log(res));
      }
    }
  }
}

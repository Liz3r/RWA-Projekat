import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl<string | null>(''),
    password: new FormControl<string | null>(''),
    rPassword: new FormControl<string | null>(''),
    firstName: new FormControl<string | null>(''),
    lastName: new FormControl<string | null>(''),
    phoneNumber: new FormControl<string | null>(''),
    country: new FormControl<string | null>(''),
    city: new FormControl<string | null>('')
  })


  onSubmit(){

  }
}

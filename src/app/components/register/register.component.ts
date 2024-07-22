import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl<string | null>('', [
      Validators.required
    ]),
    password: new FormControl<string | null>('', [
      Validators.required
    ]),
    rPassword: new FormControl<string | null>('', [
      Validators.required
    ]),
    firstName: new FormControl<string | null>('', [
      Validators.required
    ]),
    lastName: new FormControl<string | null>('', [
      Validators.required
    ]),
    address: new FormControl<string | null>('', [
      Validators.required
    ])
  })


  onSubmit(){

  }
}

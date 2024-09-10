import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/logreg/login/login.component';
import { RegisterComponent } from './components/logreg/register/register.component';

const routes: Routes = [
  {
    path: "auth",
    component: LoginComponent,
    outlet: 'logreg',
    children: [
      
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

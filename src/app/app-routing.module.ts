import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/logreg/login/login.component';
import { RegisterComponent } from './components/logreg/register/register.component';
import { LogregComponent } from './components/logreg/logreg.component';
import { AuthenticatedComponent } from './components/authenticated/authenticated.component';

const routes: Routes = [
  
  {
    path: "account",
    component: LogregComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ]
  },
  {
    path: "authenticated",
    component: AuthenticatedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

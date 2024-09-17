import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/logreg/login/login.component';
import { RegisterComponent } from './components/logreg/register/register.component';
import { LogregComponent } from './components/logreg/logreg.component';
import { AuthenticatedComponent } from './components/authenticated/authenticated.component';
import { authenticatedGuard, notAuthenticatedGuard } from './routeGuards/authenticated.guard';
import { HomeComponent } from './components/authenticated/home/home.component';
import { AddAnnouncementComponent } from './components/authenticated/add-announcement/add-announcement.component';
import { credentialsResolver } from './resolvers/credentials.resolver';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: "account",
    component: LogregComponent,
    canActivate: [notAuthenticatedGuard],
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', redirectTo: 'account/login', pathMatch: 'full'}
    ]
  },
  {
    path: "authenticated",
    component: AuthenticatedComponent,
    canActivate: [authenticatedGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'add', component: AddAnnouncementComponent},
      {path: '', redirectTo: 'authenticated/home', pathMatch: 'full'}
    ]
  },
  {
    path: '', 
    component: AppComponent,
    resolve: {credentials: credentialsResolver}
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

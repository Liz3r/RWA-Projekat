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
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AnnouncementDetailsComponent } from './components/announcement-details/announcement-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
      {path: 'account', component: AccountSettingsComponent},
      {path: 'announcement/:id', component: AnnouncementDetailsComponent },
      {path: '', redirectTo: 'authenticated/home', pathMatch: 'full'}
    ]
  },
  {
    path: '', 
    component: AppComponent,
    resolve: {credentials: credentialsResolver}
  },
  {
    path: '**', 
    component: NotFoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

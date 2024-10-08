import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/logreg/login/login.component';
import { RegisterComponent } from './components/logreg/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';
import { serverErrorReducer } from './store/server-errors/server-errors.reducer';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LogregComponent } from './components/logreg/logreg.component';
import { AuthenticatedComponent } from './components/authenticated/authenticated.component'
import { authReducer } from './store/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { HomeComponent } from './components/authenticated/home/home.component';
import { AddAnnouncementComponent } from './components/authenticated/add-announcement/add-announcement.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AnnouncementEffects } from './store/announcement/announcement.effects';
import { AnnouncementReducer } from './store/announcement/announcement.reducer';
import { PageNavComponent } from './components/page-nav/page-nav.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AnnouncementDetailsComponent } from './components/announcement-details/announcement-details.component';
import { announcementDetailsReducer } from './store/announcement-details.ts/announcement-details.reducer';
import { AnnouncementDetailsEffects } from './store/announcement-details.ts/announcement-details.effects';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { serverMessageReducer } from './store/server-success/server-success.reducer';


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['auth', 'serverErrors', 'categories'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ServerErrorComponent,
    LogregComponent,
    AuthenticatedComponent,
    HomeComponent,
    AddAnnouncementComponent,
    PageNavComponent,
    AnnouncementComponent,
    AccountSettingsComponent,
    AnnouncementDetailsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      serverErrors: serverErrorReducer, 
      auth: authReducer, 
      announcements: AnnouncementReducer, 
      announcementDetails: announcementDetailsReducer,
      serverMessage: serverMessageReducer
    }, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([AuthEffects, AnnouncementEffects, AnnouncementDetailsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

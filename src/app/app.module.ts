import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/logreg/login/login.component';
import { RegisterComponent } from './components/logreg/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';
import { serverErrorReducer } from './store/server-errors.reducer';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LogregComponent } from './components/logreg/logreg.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ServerErrorComponent,
    LogregComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({serverErrors: serverErrorReducer}),
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

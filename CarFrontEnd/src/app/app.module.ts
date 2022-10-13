import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component'; 
import { ApicallService, AuthService, CarService  } from './services'; 
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AddcarComponent } from './addcar/addcar.component';
import { EditcarComponent } from './editcar/editcar.component';  
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AdminComponent } from './admin/admin.component';
import { CarslistComponent } from './carslist/carslist.component';
import { AdminsingupComponent } from './adminsingup/adminsingup.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    HomeComponent,
    AddcarComponent,
    EditcarComponent,
    AdminComponent,
    CarslistComponent,
    AdminsingupComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ApicallService,
    CarService, 
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

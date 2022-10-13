import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcarComponent } from './addcar/addcar.component';
import { AdminComponent } from './admin/admin.component';
import { AdminsingupComponent } from './adminsingup/adminsingup.component';
import { CarslistComponent } from './carslist/carslist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditcarComponent } from './editcar/editcar.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [   
  {
    path : '',
    component : HomeComponent
  }, 
  {
    path : 'home' ,
    component : HomeComponent
  },
  {
    path : 'login' , 
    component : LoginComponent 
  },
  {
    path : 'signup' ,
    component : SignupComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent
  },
  {
    path : 'addcar' ,
    component : AddcarComponent
  },
  {
    path : 'editcar', 
    component : EditcarComponent
  },
  {
    path : 'admin', 
    component : AdminComponent
  }, 
  {
    path : 'carslist',
    component : CarslistComponent
  }, 
  {
    path : 'singupadmin', 
    component : AdminsingupComponent
  }, 
  {
    path : 'error', 
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

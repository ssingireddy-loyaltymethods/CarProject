import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApicallService,AuthService } from '../services'; 


@Component({
  
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit { 
 
  result : any 

  loginUserForm : FormGroup; 

  constructor(public apicall : ApicallService , public router : Router , public authService : AuthService) { 

    this.loginUserForm = new FormGroup({

      email : new FormControl('',[Validators.email , Validators.required]),

      password : new FormControl('',[Validators.required])

    })

  }

  ngOnInit(): void {

  } 

  login(){   

    this.apicall.login(this.loginUserForm.value).subscribe(res =>{

      this.result = res  

      console.log(this.result.data) 

      if(this.result.data === "admin" && this.result["authToken"]){ 

        alert("Login successfully") 

        this.router.navigate(['/dashboard']) 

        //localStorage.setItem('token' , this.result['authToken']) 

        this.authService.setToken(this.result['authToken']) 
        
      }  
      else if(this.result.data === 'user' && this.result["authToken"]){

        alert("Login successfully") 

        this.router.navigate(['/carslist']) 

        this.authService.setToken(this.result['authToken'])
        
      } 
      else{

        alert("Invalid User Credentails")

      }
      
    }, err =>{

      this.router.navigate(['/error'])

    })

  }
  
}




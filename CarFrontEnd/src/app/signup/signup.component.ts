import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApicallService } from '../services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
  genderValues : any = [ 
    {
      name : "Male" , 
      value : "male"
    },
    {
      name : "Famale",
      value : "female"
    },
    {
      name : "Others",
      value : "others"
    }

  ]  
  error : any

result : any 

message : any 

adminpassword = "sri123"

UserRegistrationForm : FormGroup  

constructor(public router : Router , public apicall : ApicallService) { 

    this.UserRegistrationForm = new FormGroup({

      username : new FormControl('',[Validators.required]),

      email : new FormControl('',[Validators.email,Validators.required]),

      gender : new FormControl('',[Validators.required]),

      password : new FormControl('',[Validators.required])


    }) 

  } 
  

  ngOnInit(): void {

  } 

 onSubmit(confirmPassword:any){   
    
   if(!this.UserRegistrationForm.valid){ 

      this.error = "Please enter valid details"

    }

    else if(confirmPassword !== this.UserRegistrationForm.value.password){

      this.error = "Passwords Must be Match"

    }  
    else{

      this.error = ""  

       this.apicall.register(this.UserRegistrationForm.value).subscribe(res => {

        this.result = res ; 

        this.message = this.result.data  

        if(this.message === "User register successfully"){

          alert(this.message)  

          this.router.navigate(['/login'])
     
        } 

        else{

          alert(this.message)

        }
        
        console.log("RegisterData send to service file")

      }, err => {

        this.router.navigate(['/error'])
      });

    }
    
    console.log("User Form Values is" , this.UserRegistrationForm.value)
    
  }

}

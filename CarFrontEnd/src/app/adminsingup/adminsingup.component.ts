import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ApicallService } from '../services';
@Component({
  selector: 'app-adminsingup',
  templateUrl: './adminsingup.component.html',
  styleUrls: ['./adminsingup.component.css']
})
export class AdminsingupComponent implements OnInit {

  AdminRegistrationForm : FormGroup; 

  error : any 

  result : any

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

  constructor(public router : Router , public apicall : ApicallService) { 


    this.AdminRegistrationForm = new FormGroup({

      username : new FormControl('',[Validators.required]),

      email : new FormControl('',[Validators.email,Validators.required]),

      gender : new FormControl('',[Validators.required]),

      password : new FormControl('',[Validators.required]), 

      adminpassword : new FormControl('',[Validators.required])

    })

  }

  ngOnInit(): void {
  }
  onSubmit(confirmPassword:any){   
    
    if(!this.AdminRegistrationForm.valid){ 
 
       this.error = "Please enter valid details"
 
     }
 
     else if(confirmPassword !== this.AdminRegistrationForm.value.password){
 
       this.error = "Passwords Must be Match"
 
     } 
     else if(this.AdminRegistrationForm.value.adminpassword !== "sri123") { 

      this.error = "Please Enter valid Admin password"

     } 
     else{

      this.apicall.registerAdmin(this.AdminRegistrationForm.value).subscribe(res=>{

        this.result = res; 

        if(this.result.data = "Admin register successfully"){

          alert(this.result.data) 

          this.router.navigate(['/dashboard'])

        } 
        else{

          alert(this.result.data)

        }
      } , err=>{

        this.router.navigate(['/error'])

      })

     }
} 

}

import { Injectable } from '@angular/core'; 
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(public http : HttpClient) {

   } 

   
   login(loginData : any){ 

    console.log("Login data send to nodejs")

    return this.http.post("http://localhost:4000/login", loginData)

   } 


   register(registerData : any){

    console.log("Register Data send to nodejs")

    return this.http.post("http://localhost:4000/register" , registerData); 
    
   } 

   loginAdmin(adminData : any){  

    console.log(adminData)

    return this.http.post("http://localhost:4000/loginAdmin", adminData)

   } 

   registerAdmin(registerAdmin: any){ 

    console.log(registerAdmin)

    return this.http.post("http://localhost:4000/registerAdmin",registerAdmin)

   }
  
   }

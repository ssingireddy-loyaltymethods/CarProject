import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { } 

  setToken(token : any){  

   return localStorage.setItem('token' , token) 

  }

  getToken(){

    return localStorage.getItem('token')

  }
}

import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  token : any = this.authService.getToken()

  constructor(public http : HttpClient,public authService : AuthService) { }  
   
  getCars(){ 

    return this.http.get("http://localhost:4000/getCars")

  } 

  addCars(newCarData : any){ 

    return this.http.post("http://localhost:4000/addCar", newCarData)

  } 

  removeCar(id: any){ 

    return this.http.delete("http://localhost:4000/deleteCar/"+id)

  } 

  updateCar(editAfterData : any){

    return this.http.put("http://localhost:4000/updateCar" , editAfterData)

  }

}
import {  Component, OnInit } from '@angular/core';
import { CarService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

cars : any 
carname : any ; 
model : any ;
type : any ;
price : any ;
formHeader : any  ;
carsData : any  ;  
response : any 
newCarData : any 
data : any 
confirm : any

  constructor(public carService : CarService , public router : Router) { } 

  
  ngOnInit(): void {  

    this.display()

  }

  display(){

    this.carService.getCars().subscribe( res =>{

      this.carsData = res 

      this.cars = this.carsData.data 

      console.log(this.cars)

    } , err =>{

      document.write(err.message)

    })

  }

addCar(){

  this.formHeader = "Add Car" 
  this.carname = null ,
  this.model = null , 
  this.type = null ,
  this.price = null 

  this.router.navigate(['/addcar'])

}  

editCar(car : any){

  this.formHeader = "Edit Car" 

  this.data = {  
     id : car['_id'],
    name : car.name,
    model: car.model, 
    type : car.type,
    price: car.price
  }  
  
  console.log("data", this.data)

  this.router.navigate(['/editcar',{data : JSON.stringify(this.data)}])

}
 
logout(){

  localStorage.removeItem('token')

}


deleteCar(id : any){   

this.confirm = confirm("Do you want to delete the car") 

if(this.confirm){

  this.carService.removeCar(id).subscribe( res=>{

    this.response = res ; 

    if(this.response.data === "Car deleted successfully"){ 
      
       this.display()
      
    }

    else{

      document.write("Error")

    }
  } , (err)=>{

   this.router.navigate(['/error'])

  }) 
} 
else{

  this.router.navigate(['/dashboard'])
  
}

} 
adminLogOut(){ 

  localStorage.removeItem('token')

}


}


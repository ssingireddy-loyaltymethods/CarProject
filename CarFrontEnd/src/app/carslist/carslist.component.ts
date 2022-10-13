import { Component, OnInit } from '@angular/core';
import { CarService } from '../services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})
export class CarslistComponent implements OnInit {

  carsData:any; 

  cars : any

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

      this.router.navigate(['/error'])

    })

  } 
  
  logout(){

    localStorage.removeItem('token')
    
  }

}

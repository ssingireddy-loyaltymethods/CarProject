import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../services';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent implements OnInit {

  carname : any ; 
  model : any ;
  type : any ;
  price : any ; 
  newCarData : any
  result : any

  constructor(public router : Router, public carService : CarService) { }


  ngOnInit(): void {

  } 

  add(){

    this.newCarData = { 
      name : this.carname , 
      model : this.model,
      type : this.type, 
      price : this.price
    }  

    this.carService.addCars(this.newCarData).subscribe(res=>{ 

      this.result = res

      alert(this.result.data) 

      this.router.navigate(['/dashboard'])

    }, err=>{

      this.router.navigate(['/error'])
      
    })
    
  } 

  closeForm(){ 

    this.router.navigate(['/dashboard'])

  }

}

import { Component, OnInit} from '@angular/core';
import { ParamMap, Router} from "@angular/router"
import { CarService } from '../services'; 
import { ActivatedRoute } from '@angular/router';  


@Component({
  selector: 'app-editcar',
  templateUrl: './editcar.component.html',
  styleUrls: ['./editcar.component.css']
})
export class EditcarComponent implements OnInit {


  carname : any ; 
  model : any ;
  type : any ;
  price : any ;
  myparam : any; 
  editBeforeData : any
  editAfterData : any 
  result : any

  constructor(public router : Router, public carService : CarService, public activeRouter : ActivatedRoute) { 
   
  } 

  ngOnInit() { 

   this.myparam = this.activeRouter.snapshot.paramMap.get('data') 

   this.editBeforeData = JSON.parse(this.myparam) 

   this.carname = this.editBeforeData.name ; 

   this.model = this.editBeforeData.model ;

   this.type = this.editBeforeData.type ;

   this.price = this.editBeforeData.price 

   console.log("editBeforeData " ,this.editBeforeData)

  } 

  edit(){

    this.editAfterData = { 

      id : this.editBeforeData.id ,

      name : this.carname ,

      model : this.model ,

      type : this.type  ,

      price : this.price 
    } 

    console.log("EditAfterData", this.editAfterData)

    this.carService.updateCar(this.editAfterData).subscribe(res=>{  

      this.result = res 

      if(this.result.data === "Car Updated Successfully"){

        alert(this.result.data) 

        this.router.navigate(['/dashboard'])

      } 

      else{

        document.write("Error")

      }
      
    }, err=>{

      this.router.navigate(['/error'])

    })

   }
  
  closeForm(){

    this.router.navigate(['/dashboard'])

  }

}

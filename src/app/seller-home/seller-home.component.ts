import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
   productMessage:undefined|string;
   productList :undefined| product[];
   icon=faTrash;
   editIcon=faEdit;
  constructor(private product:ProductService){}

  ngOnInit():void{
    this.list();
  }
  
  deleteProduct(id:number)
  {
    this.product.deleteProduct(id).subscribe((data)=>{
      if(data){
        this.productMessage="Product is deleted";
        this.list();
      }
    })
    setTimeout(() => {
      this.productMessage='';
    },3000);
  }

list(){
  this.product.productList().subscribe((data:any)=>{
    console.log(data);
    this.productList = data;
})}
}

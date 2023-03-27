import { Component } from '@angular/core';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  productMessage:string|undefined;
   constructor(private product:ProductService){}

  submit(data:product)
  {
    console.log(data);
    this.product.addProduct(data).subscribe((result)=>{
      console.log(result);
      if(result)
      {
        this.productMessage="Product is added successfully!";
      }
      setTimeout(()=>(this.productMessage=undefined),3000)
    });
    
  }
}

import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType:string='defult';
  sellerName:string|undefined;
  serachResult:undefined|product[];
  userName:string|undefined='';
  cartItem=0;
  showUserContent:boolean=false;
  showSellerContent:boolean=false;
  constructor(private route:Router, private product:ProductService){}



ngOnInit():void{
   this.route.events.subscribe((val:any)=>{
   if(val.url){
    if(localStorage.getItem('seller') && val.url.includes('seller'))
    {
        let sellerStore = localStorage.getItem('seller');
        let sellerData = sellerStore && JSON.parse(sellerStore)[0];
        this.sellerName = sellerData.name;
        this.menuType='seller';
      }
      else if(localStorage.getItem('user'))
      {
        let userStore = localStorage.getItem('user');
        let userData =userStore && JSON.parse(userStore)[0];
        this.userName=userData.name;
        console.log(this.userName)
        this.menuType='user';
        this.product.getCartList(userData.id);

      }

    else{
      this.menuType='default';
    }
  }
   });
  let cartData = localStorage.getItem('localCart');
  if(cartData){
  this.cartItem=JSON.parse(cartData).length;
  console.log(this.cartItem)
  }
  this.product.cartData.subscribe((items)=>{
    this.cartItem=items.length;
    console.log(this.cartItem)
  })
}
  
sellerLogout():void{
  localStorage.removeItem('seller');
  this.showSellerContent=false;
  this.route.navigate(['/']);
}

userLogout(){
  localStorage.removeItem('user');
  this.route.navigate(['/user-auth']);
  this.product.cartData.emit([]);
  this.showUserContent=false;
}

searchProduct(query:KeyboardEvent){
  if(query){
    const element = query.target as HTMLInputElement;
    console.log(element.value);
    this.product.searchProduct(element.value).subscribe((data)=>{
      console.log(data);
      if(data.length>5)
      data.length=5;
      this.serachResult=data;
    })
  }
}
hideSearch()
{
  this.serachResult=undefined;
}
submitSearch(val:string)
{
  this.route.navigate([`search/${val}`]);

}

redirectToDetails(id:number){
  this.route.navigate(['/details/'+id]);
}

userContent():void{

  if(this.showUserContent===false){
  this.showUserContent=true;
}
  else{
  this.showUserContent=false;
  }
}

sellerContent(){
  if(this.showSellerContent===false){
    this.showSellerContent=true;
  }
  else{
    this.showSellerContent=false;
  }
}

}
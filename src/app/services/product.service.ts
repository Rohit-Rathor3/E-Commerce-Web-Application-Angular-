import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-types';

@Injectable({
  providedIn: 'root'   
})
export class ProductService {
  cartData = new EventEmitter<product[]|[]>();

  constructor(private http:HttpClient) { }
  addProduct(data:product){
   return this.http.post('https://e-commerce-json-data.onrender.com/products',data);
  }

  productList(){
    return this.http.get<product[]>("https://e-commerce-json-data.onrender.com/products");
  }
  deleteProduct(id:number)
  {
    return this.http.delete(`https://e-commerce-json-data.onrender.com/products/${id}`);
  }

  getProduct(id:string)
  {
    return this.http.get<product>(`https://e-commerce-json-data.onrender.com/products/${id}`);
  }

  updateProduct(product:product)
  {
   return this.http.put(`https://e-commerce-json-data.onrender.com/products/${product.id}`,product);
  }

  popularProducts(){
   return  this.http.get<product[]>("https://e-commerce-json-data.onrender.com/products?_limit=3");
  }
  
  trendyProducts(){
    return  this.http.get<product[]>("https://e-commerce-json-data.onrender.com/products?_limit=8");
  }

  searchProduct(query:string){
    return  this.http.get<product[]>(`https://e-commerce-json-data.onrender.com/products?q=${query}`);
  }
  localAddToCart(data:product){
    let cartData=[];
    let localCart=localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
      cartData=JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId:number){
    let cartData =localStorage.getItem('localCart')
      if(cartData){
         let items:product[] = JSON.parse(cartData);
         items = items.filter((item:product)=>productId!==item.id)
         console.log(items)
         localStorage.setItem('localCart',JSON.stringify(items));
         this.cartData.emit(items);
      }
    }
  
  addToCart(cartData:cart){
   return this.http.post('https://e-commerce-json-data.onrender.com/cart',cartData);
  }

  getCartList(userId:number){
    return this.http.get<product[]>('https://e-commerce-json-data.onrender.com/cart?userId='+userId,{observe:'response'}).subscribe((result)=>{
    console.log(result);
    if(result && result.body)  
    this.cartData.emit(result.body);
    });
  }
  removeToCart(cartId:number){
    return this.http.delete('https://e-commerce-json-data.onrender.com/cart/'+cartId);
  }

  currentCart(){
    let userStore=localStorage.getItem('user');
    let userData = userStore &&JSON.parse(userStore)[0];
    return this.http.get<cart[]>('https://e-commerce-json-data.onrender.com/cart?userId='+userData.id);
  }

  orderNow(data:order){
    return this.http.post('https://e-commerce-json-data.onrender.com/orders',data);
  }

  orderList(){
    let userStore =localStorage.getItem('user');
    let userData = userStore&& JSON.parse(userStore)[0];
    return  this.http.get<order[]>("https://e-commerce-json-data.onrender.com/orders?userId="+userData.id);
  }

  deleteCartItems(cartId:number|undefined){
   
    return this.http.delete('https://e-commerce-json-data.onrender.com/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
        
        this.cartData.emit([]);
        
     
    })
  
  }
  cancelOrder(orderId:number){
    return this.http.delete('https://e-commerce-json-data.onrender.com/orders/'+orderId);
  }
}

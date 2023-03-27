import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-types';
import { BehaviorSubject } from 'rxjs';

@Injectable({           
                       
  providedIn: 'root'
})
export class SellerService {
  
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private htp:HttpClient, private router:Router) { }
  userSignUp(data:SignUp){
     this.htp.post('https://e-commerce-json-data.onrender.com/seller',data,{observe:'response'}).subscribe((result)=>
    {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem("seller",JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
    });
  }

  reloadSeller(){
    if(localStorage.getItem('seller'))
    {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data:login){
      console.log(data);
      // api call code will be there
      this.htp.get(`https://e-commerce-json-data.onrender.com/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
        console.log(result);
        if(result && result.body && result.body.length){
        console.log("User logged in");
        localStorage.setItem("seller",JSON.stringify(result.body));
      this.router.navigate(['seller-home']);}
        else{
        console.log("login failed");
        this.isLoginError.emit(true);
        }

      })
  }
}

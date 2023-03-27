import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth= new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(user:SignUp){
    this.http.post('https://e-commerce-json-data.onrender.com/user/',user,{observe:'response'}).subscribe((result)=>{
      console.log(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }

  userLogin(data:login){
    this.http.get<SignUp[]>(`https://e-commerce-json-data.onrender.com/user?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result)=>{
    if(result && result.body?.length ){
      localStorage.setItem('user',JSON.stringify(result.body));
      this.invalidUserAuth.emit(false);
      this.router.navigate(['/']);
    }  
    else{
      this.invalidUserAuth.emit(true);
    }
    
    })
  }
}

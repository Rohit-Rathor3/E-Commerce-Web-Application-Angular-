import { Component, OnInit } from '@angular/core';
import { cart, login, product, SignUp } from '../data-types';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError:string='';
  constructor(private user: UserService,private product:ProductService) {}
  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }
  login(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if(result){
        this.authError="Please enter valid credentials";
      }
      else{
        this.localCartToRemoteCart();
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
  localCartToRemoteCart(){
      let data=localStorage.getItem('localCart');
      let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user)[0].id;
      if(data){
        let cartDataList=JSON.parse(data);
        

        cartDataList.forEach((product:product,index: number) => {
          let cartData:cart={
            ...product,
            productId:product.id,
            userId:userId
          };
          delete cartData.id;
          setTimeout(()=>{
            this.product.addToCart(cartData).subscribe((result)=>{
              if(result){
              console.log("data stored in DB");
              }
          })
          if(cartDataList.length===index+1)
          {
            localStorage.removeItem('localCart');
          }
          },500)
          
        });

      }
      setTimeout(()=>{
        this.product.getCartList(userId);
      },2000)
  }
}

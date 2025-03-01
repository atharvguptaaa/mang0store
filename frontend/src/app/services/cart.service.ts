import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cartItems:Product[]=[];
private cartSubject= new BehaviorSubject<Product[]>(this.cartItems);

cart$=this.cartSubject.asObservable();

  constructor() { }

  addToCart(product:Product){
    this.cartItems.push(product);
    this.cartSubject.next([...this.cartItems]); //to emit a new array to all subscribers
  }

  removeFromCart(productId:number){
    this.cartItems=this.cartItems.filter((item)=>item.product_id!==productId);
    this.cartSubject.next([...this.cartItems]);
  }

  getCartItems():Observable<Product[]>{
    return this.cart$;
  }

  getTotalPrice():number{
    return this.cartItems.reduce((total,item)=>total+item.price,0);
  }

  clearCart(){
    this.cartItems=[];
    this.cartSubject.next(this.cartItems);

  }
}

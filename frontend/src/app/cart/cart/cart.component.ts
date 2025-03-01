import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product-model';

@Component({
  selector: 'app-cart',
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems:Product[]=[];
  total=0;

  constructor(private cartService: CartService){};

  ngOnInit(): void {
      this.cartService.getCartItems().subscribe((items)=>{
        this.cartItems=items;
        this.total=this.cartService.getTotalPrice();
      });
  }

  removeFromCart(item_id:number){
    this.cartService.removeFromCart(item_id);
  }
}

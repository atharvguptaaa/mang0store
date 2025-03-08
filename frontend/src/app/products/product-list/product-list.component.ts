// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product-model';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-product-list',
  imports: [NgFor, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products:Product[]=[];

  constructor(private productService:ProductService){};

  ngOnInit(): void {
      this.productService.getProducts().subscribe((data)=>{
          this.products=data;
      })
  }

  addToCart(product:Product){
    console.log("Product Added to cart : " , product);
  }
}
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product-model';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [NgFor],
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
    
  }

}

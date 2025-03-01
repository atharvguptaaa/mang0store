import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl='http://localhost:3000/products';
  
  constructor(private http:HttpClient) { }

  //fetch all products
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }

  //fetch single product
  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}

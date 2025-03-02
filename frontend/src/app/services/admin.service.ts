import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl='http://localhost:3000/products'; // Backend API for products

  constructor(private http:HttpClient) { }

  addProduct(product:Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl,product);
  }

  updateProduct(productId:number,product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, product);
  }

  deleteProduct(productId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}

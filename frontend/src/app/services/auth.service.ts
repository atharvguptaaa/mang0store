import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl='http://localhost:3000/auth'; // Backend URL
  private userSubject=new BehaviorSubject<any>(null);
  user$=this.userSubject.asObservable();

  constructor(private http:HttpClient) {}

    //Redirects to the backend's login route 
    login(){
      console.log("login");
      window.location.href=`${this.apiurl}/login`;
    }

    //Fetches the user profile if authenticated 
    getProfile():Observable<any>{
      return this.http.get<any>(`${this.apiurl}/profile`,{withCredentials:true});
    }

    // Logs out the user
    logout():Observable<any>{
      return this.http.get<any>(`${this.apiurl}/logout`,{withCredentials:true});
    }

    //Sets user data after fetching profile
    setUser(user:any){
      this.userSubject.next(user);
    }

   
}

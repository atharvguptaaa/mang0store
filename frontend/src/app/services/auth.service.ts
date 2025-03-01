import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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
         return this.http.get<any>(`${this.apiurl}/profile`,{withCredentials:true})
      // return this.http.get<any>(`${this.apiurl}/profile`,{withCredentials:true}).pipe(
      //   tap((user)=>{
      //     this.setUser(user);
      //   })
      // )
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

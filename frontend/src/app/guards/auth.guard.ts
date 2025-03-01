import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthService);
  const router=inject(Router);
  return authService.getProfile().pipe(
    map((user)=>{
      if(user){
        authService.setUser(user);
        return true;
      }
      router.navigate(['/login']);
      return false;
    }),
    catchError(()=>{
      router.navigate(['/login']);
      return of(false);
    })
  )
  
};

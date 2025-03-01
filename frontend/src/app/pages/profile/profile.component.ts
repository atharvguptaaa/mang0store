import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-profile',
  imports: [NgIf,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
user:any;

constructor(private authService: AuthService, private router: Router) {}

ngOnInit(): void {
    // this.authService.getProfile().subscribe();
    this.authService.user$.subscribe((user)=>{
      this.user=user;
    });

}



logout(){
  this.authService.logout().subscribe(()=>this.router.navigate(['/']));

}

}

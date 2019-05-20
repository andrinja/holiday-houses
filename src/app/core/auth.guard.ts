import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate  {
  
  constructor(public afAuth: AngularFireAuth,
                public userService: UserService,
                private router: Router ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        // Allow access
        console.log('allow access');
        return resolve(true);
  
      }, err => {
        this.router.navigate(['/login']);
        
        // Don't allow access
        console.log('denied access');
        return resolve(false);
        
      })
    })
  }
}

import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'holiday-homes';
  user = '';

  constructor( public authService: AuthService,
               public userService: UserService,
               public router: Router) {
   
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigateByUrl('login');
      console.log('success');

    }, (error) => {
      console.log("Logout error", error);
    });
  }

}

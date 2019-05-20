import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(public authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { 

    this.createForm();
  }

  createForm() {
      this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
       this.router.navigate(['/dashboard/properties']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}

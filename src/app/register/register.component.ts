import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: any;
  registerForm: FormGroup;
  errorMessage: any;
  successMessage: any;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {
     this.registerForm = this.fb.group({
       firstName: ['', Validators.required],
       lastName:  ['', Validators.required],
       email:     ['', Validators.required],
       password:  ['', Validators.required]
     })
  }
  // access form control through get metho
   get firstName() { return this.registerForm.get('firstName'); }
  
  // onSubmit() {
  //   let user = this.registerForm.value as User;
  //   //subscribe to Observable from FirebaseOb
  //   this.usersService.createUser(user)
  //   .valueChanges().subscribe(
  //     (response)  => console.log(response),
  //     (error)   => console.log(error)
  //   );
      
  //   }

  tryRegister(value){
    this.auth.doRegister(value)
    .then(res => {
      this.errorMessage = "";
      this.successMessage = "Your account has been created";

      //redirect me to the login page
      this.router.navigateByUrl('home/login');
      
    }, err => {
      console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
    })
  }
  }

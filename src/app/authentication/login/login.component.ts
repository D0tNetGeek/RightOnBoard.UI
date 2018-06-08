import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService, Credentials } from './../../core/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  model: Credentials = { username: "", password: "", rememberMe: false };
  loading = false;
  errors: string;
  errorMesssage = "";
  returnUrl: string | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
    ) { }    

  ngOnInit() {
    //reset the login status
    this.authenticationService.logout(false);

    //get the return url from route parameters
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];// || '/';
  }

  login(form: NgForm){
    this.loading = true;
    console.log(form);

    this.errorMesssage = "";

    this.authenticationService.login(this.model)
    .subscribe(isLoggedIn => {
      console.info("Is Logged In : ", isLoggedIn);
      if(isLoggedIn){

        console.info("Return Url : ", this.returnUrl);
        console.info("SnapShot : ", this.route.snapshot);

        if(this.returnUrl){
          this.router.navigate([this.returnUrl]);
        }
        else{
           this.router.navigate([isLoggedIn]);
        }
      }
      this.loading = false;
    },
      (errorMesssage: HttpErrorResponse) => {
        console.error("Login error : ", errorMesssage);
      
        if(errorMesssage.status === 400) {
          this.errorMesssage = "Invalid Username or Password. Please try again.";
        }else if(errorMesssage.status === 401) {
          this.errorMesssage = "Invalid Username or Password. Please try again.";
        }
        else{
          this.errorMesssage = `${errorMesssage.statusText} : ${errorMesssage.message}`;
        }

        this.loading = false;
      });
  }
  
  // login(){
  //   this.loading = true;
  //   this.errors = '';

  //   this.authenticationService.login(this.model.username, this.model.password)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.router.navigate([data.returnUrl]);
  //       },
  //       error => this.errors = error)
  // }
}

import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from '../core/services';
import { IRegistration } from '../core/models/register';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private registrationModel : IRegistration = { "email": "", "password": "", "department": "", "timeInJob":"", "role": ""};

  private confirmPassword: string = "";
  private errorMesssage: string = "";
  
  departments = [];
  timeInJobs = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.errorMesssage = "";
    this.loadDepartments();
    this.loadTimeForJobs();
  }

  loadDepartments() {
    this.authService.getDepartments()
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.departments = data;
          }
        })
  }

  loadTimeForJobs() {
    this.authService.getTimeInJob()
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.timeInJobs = data;
          }
        });
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validate() {
    this.errorMesssage = "";
    if (!this.validateEmail(this.user.email)) {
      this.errorMesssage = 'Invalid Email.';
      return false;
    }
    if (this.user.password == "") {
      this.errorMesssage = 'Enter a password.';
      return false;
    }
    if ((this.user.password != "" || this.confirmPassword != "") && this.user.password != this.confirmPassword) {
      this.errorMesssage = 'Password does not match the confirm password.';
      this.confirmPassword = "";
      return false;
    }
    if (this.user.department == "") {
      this.errorMesssage = 'Select One Department.';
      return false;
    }
    if (this.user.timeInJob == "") {
      this.errorMesssage = 'Select One Time in Job Option.';
      return false;
    }
    return true;
  }

  change() {
    this.errorMesssage = "";
  }

  submitForm(form:NgForm) {
    if (this.validate()) {
      this.user.password=""+CryptoJS.MD5(this.user.password);
      this.authService.register(this.registrationModel)
        .subscribe(
          data => {
            if(data==false){
              this.errorMesssage = 'User Registeratin Failed.';
            }else{
              this.router.navigate(["/"]);
            }
          })
    }
  }
}

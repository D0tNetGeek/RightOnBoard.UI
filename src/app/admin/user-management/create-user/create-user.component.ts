import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../admin/services/admin.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router,
    private route: ActivatedRoute) { }
  user = { "email": "", "password": "", "department": "", "timeInJob": "", "role": "User" }
  confirmPassword: String = ""
  departments = [];
  timeForJobs = [];

  ngOnInit() {
    this.errorMesssage = "";
    this.loadDepartments();
    this.loadTimeForJobs();
  }
  loadDepartments() {
    this.adminService.getDepartments()
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.departments = data;
          }
        })
  }
  loadTimeForJobs() {
    this.adminService.getTimeInJob()
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.timeForJobs = data;
          }
        })
  }
  errorMesssage: string = "";
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
  submitForm() {
    if (this.validate()) {
      this.user.password = "" + CryptoJS.MD5(this.user.password);
      this.adminService.registerNewUser(this.user)
        .subscribe(
          data => {
            if (data == false) {
              this.errorMesssage = 'User Registeratin Failed.';
            } else {
              this.router.navigate(["/admin/userManagement"]);
            }
          })
    }
  }
}

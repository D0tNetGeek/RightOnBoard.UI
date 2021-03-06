import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../admin/services/admin.service';

import * as CryptoJS from 'crypto-js';
import { _MatButtonToggleGroupMixinBase } from '@angular/material';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
  errorMesssage: string = "";

  constructor(
    private adminService: AdminService, 
    private router: Router,
    private route: ActivatedRoute) { }

  loading: boolean = false;

  user = { "companyId": "", "email": "", "password": "", "firstName": "", "lastName": "", "location":"", "regOptions":[{"registrationOptionId":"", "registrationOptionValueId":""}], "roleId": "" };
  company = {"companyId": "", "companyName": ""};

  confirmPassword: String = ""
  companies = [];
  roles = [];
  regOptions = [];

  ngOnInit() {
    this.loading = false;

    this.errorMesssage = "";

    this.loadCompanies();
    this.loadRoles();
  }

  loadCompanies(){
    this.loading = true;

    this.adminService.getCompaniesListForAdmin()
    .subscribe(
      data => {
        this.companies = data;

        this.loading = false;
      }
    )
  }

  loadRoles() {
    this.loading = true;

    this.adminService.getRolesList()
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.roles = data;
            
            this.loading = false;
          }
        })
  }

  loadRegistrationOptions(companyId: string){
    this.loading = true;

    this.errorMesssage = "";    

    console.log("Company : ", companyId);

    this.adminService.getRegistrationOptionsList(companyId)
    .subscribe(
      data => {
        this.regOptions = data;

        //this.user.regOptions = data;
        
        this.loading = false;

        console.log("REG OPTIONS : ",this.regOptions);
      }
    )
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  validate() {
    this.errorMesssage = "";

    //console.log("USER OBJECT : ", this.user);

    if (this.user.companyId == "") {
      this.errorMesssage = 'Enter a valid company.';
      return false;
    }

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

    console.log("VALIDATION : ",this.user.regOptions[0]);
    
    if (this.user.regOptions[0] == undefined) {
      this.errorMesssage = 'Select valid registration option.';
      return false;
    }

    if (this.user.roleId == "") {
      this.errorMesssage = 'Select a valid role.';
      return false;
    }

    return true;
  }
  
  change() {
    this.errorMesssage = "";
  }

  createUser() {
    if (this.validate()) {

      //this.user.password = "" + CryptoJS.MD5(this.user.password);

      this.loading = true;
      
      console.log("USER SUBMITTED : ", this.user);

      this.adminService.registerNewUser(this.user)
        .subscribe(
          data => {
              console.log("user created : ", data);
              this.router.navigate(["/admin/user-management"]);
          },
          error=>{
            console.log("Result from create user :",error);
            if (error.status == 400) {
              this.errorMesssage = 'User Registration Failed.';
              this.loading = false;
            }
        })
    }
  }
}
import { Component, OnInit, Injectable } from '@angular/core';

import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})

@Injectable()

export class CreateCompanyComponent implements OnInit {

  errorMesssage: string = "";

  constructor(
    private adminService: AdminService, 
    private router: Router,
    private route: ActivatedRoute) { }
  
    company = { "companyId": "", "companyName": ""}
  

  ngOnInit() {
    this.errorMesssage = "";
  }
    
  validate() {

    this.errorMesssage = "";    
    if (this.company.companyName == "") {
      this.errorMesssage = 'Enter a Company Name.';
      return false;
    }

    return true;
  }

  change() {
    this.errorMesssage = "";
  }
  
  createCompany(company) {
     if (this.validate()) {      
       this.adminService.createCompany(this.company)
         .subscribe(
           data => {
             if (data == false) {
               this.errorMesssage = 'Company Creation Failed.';
             } else {
               this.router.navigate(["/admin/company-management"]);
             }
           })
    }
  }
}

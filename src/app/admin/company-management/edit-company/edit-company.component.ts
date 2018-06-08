import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminService } from '../../services/admin.service';

//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  loading: boolean = false;
  companyInfo: any = [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private adminService: AdminService,
    //private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loading = false;

    let companyInfo: { "companyId": "", "companyName": ""}; //, "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": "", "endDate": "", "publicationDate": "", "expirationDate": "" },

    companyInfo = JSON.parse(window.sessionStorage.getItem("currentCompany"));

    this.companyInfo = companyInfo;

    console.log("Company Info : ", companyInfo);
  }
  
  ngOnDestroy() {
    window.sessionStorage.setItem("currentCompany", "");
  }

  editCompany(company){

    this.loading = true;

    this.adminService.saveCompanyInfo(this.companyInfo)
    .subscribe(
      data => {
        if (data == undefined || data == null) {
          alert('Invalid')
          return;
        } else {
          //this.toastr.success('Hello world!', 'Toastr fun!');
          this.router.navigate(["/admin/company-management"]);
        }

        this.loading = false;
        
      })
  }
}

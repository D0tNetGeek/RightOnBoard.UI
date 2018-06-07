import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {

  loading: boolean = false;
  companyList: any = [];

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    this.loading = false;

    let company: any = {
      companyInfo: { "companyId": "", "name": ""} //, "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": "", "endDate": "", "publicationDate": "", "expirationDate": "" },
    };

    //window.sessionStorage.setItem("currentSurvey", JSON.stringify(survey));

    this.getCompaniesListForAdmin();
  }
  
  ngOnDestroy() {  
  }

  createCompany() {
    this.router.navigate(["/admin/create-company"]);
  }

  getCompaniesListForAdmin() {
    this.loading = true;

    this.adminService.getCompaniesListForAdmin()
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.companyList = data;
            console.log("Company List:", this.companyList);
            this.loading = false;
          }
        })
  }

  editCompany(companyId) {
    this.adminService.getCompanyInfoByCompanyId(companyId)
      .subscribe(
        data => {
          if (data == undefined || data == null) {
            alert('Invalid')
            return;
          } else {
            window.sessionStorage.setItem("currentCompany", JSON.stringify(data));
            this.router.navigate(["/admin/edit-company"]);
          }
        })
  }

}

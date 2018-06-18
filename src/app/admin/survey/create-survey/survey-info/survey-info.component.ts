import { Component, OnInit, Input ,OnChanges,SimpleChanges } from '@angular/core';

import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-survey-info',
  templateUrl: './survey-info.component.html',
  styleUrls: ['./survey-info.component.css']
})
export class SurveyInfoComponent implements OnInit {
  @Input() surveyObj: any;
  @Input() reset: boolean;
  
  loading: boolean = false;
  companies = [];
  errorMesssage:string="";

  company = {"companyId": "", "companyName": ""};
  
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loading = false;

    this.loadCompanies();
  }
  ngOnChanges(changes: SimpleChanges): void{
   if(changes.reset.currentValue!=changes.reset.previousValue){    
    this.surveyObj.surveyInfo.companyId = ""
    this.surveyObj.surveyInfo.surveyId = ""
    this.surveyObj.surveyInfo.name = ""
    this.surveyObj.surveyInfo.description = ""
    this.surveyObj.surveyInfo.welcomeMessage = ""
    this.surveyObj.surveyInfo.exitMessage = ""
    this.surveyObj.surveyInfo.startDate = null
    this.surveyObj.surveyInfo.endDate = null
    this.surveyObj.surveyInfo.publicationDate = null
    this.surveyObj.surveyInfo.expirationDate = null
   }
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
  
  validate(){
    this.errorMesssage="";
    if((this.surveyObj.surveyInfo.startDate!=""&& this.surveyObj.surveyInfo.endDate!="") && this.surveyObj.surveyInfo.startDate>this.surveyObj.surveyInfo.endDate ){
      this.errorMesssage="End Date should be greater than Start Date";
      return;
    }
    if((this.surveyObj.surveyInfo.publicationDate!=""&& this.surveyObj.surveyInfo.expirationDate!="") &&this.surveyObj.surveyInfo.publicationDate>this.surveyObj.surveyInfo.expirationDate ){
      this.errorMesssage="Expiration Date should be greater than Publication Date";
    }
  }

  isDisabledInfo() {
    if (this.surveyObj.surveyInfo.name == ""
      || this.surveyObj.surveyInfo.description == ""
      || this.surveyObj.surveyInfo.welcomeMessage == ""
      || this.surveyObj.surveyInfo.exitMessage == ""
      || this.surveyObj.surveyInfo.startDate == ""
      || this.surveyObj.surveyInfo.endDate == ""
      || this.surveyObj.surveyInfo.publicationDate == ""
      || this.surveyObj.surveyInfo.expirationDate == ""
    ) {
      return true;
    } else {
      if(this.surveyObj.surveyInfo.startDate>this.surveyObj.surveyInfo.endDate ){
        return false;
      }
      if(this.surveyObj.surveyInfo.publicationDate>this.surveyObj.surveyInfo.expirationDate ){
        return false;
      }
      return false;
    }
  }

  nextTab(tabName){
    alert('Next Tabs')
  }

}

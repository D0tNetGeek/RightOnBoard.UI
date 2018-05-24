import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-survey-info',
  templateUrl: './survey-info.component.html',
  styleUrls: ['./survey-info.component.css']
})
export class SurveyInfoComponent implements OnInit {
  @Input() surveyObj: any;
  constructor() { }

  ngOnInit() {
  }
  errorMesssage:string="";
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

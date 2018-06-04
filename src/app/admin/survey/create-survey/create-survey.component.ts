import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../services/admin.service'

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  survey: any = JSON.parse(window.sessionStorage.getItem("currentSurvey"))
 
  isEdit: boolean = false;

  selectedGroup: any = null;//{ "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [] };
  selectedDriver: any = null;

  activeTab: string = 'info';

  ngOnInit() {
    this.setActiveTab("info");

    if (this.survey.surveyInfo.surveyId == "") {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  ngOnDestroy() {
    let survey: any = {
      surveyInfo: { "surveyId": "", "name": "", "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": "", "endDate": "", "publicationDate": "", "expirationDate": "" },
      questionGroups: [{ "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [{ "id": "", "driverName": "", "questions": [{ "id": "", "questionName": "", "questionText": "", "questionAnswerRequired": null, "questionNumber": "", "questionSequence": 0, "questionTypeName": "" }] }] }]
    };
    window.sessionStorage.setItem("currentSurvey", JSON.stringify(survey));
  }

  groupSelected(event) {
    this.selectedGroup = event;
    this.selectedDriver=null;
    this.activeTab = 'drivers';
  }

  driverSelected(event) {
    this.selectedDriver = event;
    this.activeTab = 'questions';
  }

  isTabActive(tabName) {
    return this.activeTab == tabName;
  }

  setActiveTab(tab) {
    console.log("Active Tab : ", tab);

    if(this.activeTab=="info" || this.activeTab=="iteration" || this.activeTab=="groups"){
      this.selectedGroup = null;
      this.selectedDriver =null;
    }

    if(this.activeTab=="driver"){
      this.selectedDriver=null;
    }

    this.activeTab = tab;
  }

  isDisabledTab(tab) {
    this.activeTab == tab;
    if(tab=="info"){

    }
    return false;
  }

  isIterationTabDisabled(){
    let returnValue:boolean=false;

    if(this.activeTab=="info"){
      return !this.validate();
    }
    
    return returnValue;
  }

  isGroupTabDisabled(){
    let returnValue:boolean=false;

    if(this.activeTab=="info" || this.activeTab=="iteration"){
      return !this.validate();
    }
    return returnValue;
  }

  isDriverTabDisabled(){
    let returnValue:boolean=false;

    if(this.activeTab=="info"|| this.activeTab=="iteration"){
      return true;
    }

    if(this.activeTab=="groups"){
      if(this.selectedGroup==null){
        return true;
      }
      else{
        return false;
      }
    }

    return returnValue;
  }

  isQuestionTabDisabled(){
    let returnValue:boolean=false;

    if(this.activeTab=="info" || this.activeTab=="iteration" || this.activeTab=="groups"){
      return true;
    }

    if(this.activeTab=="drivers"){
      if(this.selectedDriver==null){
        return true;
      }
      else{
        return false;
      }
    }

    return returnValue;
  }

  saveSurvey() {
    if (this.validate()) {
      alert('Submit Survey Data');
      window.localStorage.setItem("surveyData",JSON.stringify(this.survey));
      alert('xxxxxxxxx')
    } else {
      alert('Survey Info In-complete');
    }
  }

  validate() {
    if (this.survey.surveyInfo.name == ""
      || this.survey.surveyInfo.description == ""
      || this.survey.surveyInfo.welcomeMessage == ""
      || this.survey.surveyInfo.exitMessage == ""
      || this.survey.surveyInfo.startDate == null
      || this.survey.surveyInfo.endDate == null
      || this.survey.surveyInfo.publicationDate == null
      || this.survey.surveyInfo.expirationDate == null) {
      return false;
    } else {
      return true;
    }
  }
}

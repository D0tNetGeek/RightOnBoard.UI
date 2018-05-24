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
  ngOnInit() {
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
  selectedGroup: any = { "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [] };
  selectedDriver: any = { "id": "", "driverName": "", "questions": [] };
  groupSelected(event) {
    this.selectedGroup = event;
    this.activeTab = 'drivers';
  }
  driverSelected(event) {
    this.selectedDriver = event;
    this.activeTab = 'questions';
  }
  activeTab: string = 'info';
  isTabActive(tabName) {
    return this.activeTab == tabName;
  }
  setActiveTab(tab) {
    this.activeTab = tab;
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

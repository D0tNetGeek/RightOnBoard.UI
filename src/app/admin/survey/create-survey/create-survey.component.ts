import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service'

import { Subject } from 'rxjs';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  loading: boolean = false;

  public modalRef: BsModalRef;
  public onClose: Subject<boolean>;

  //survey: any = JSON.parse(window.sessionStorage.getItem("currentSurvey"))  

  isEdit: boolean = false;

  selectedGroup: any = null;//{ "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [] };
  selectedDriver: any = null;

  activeTab: string = 'info';

  surveyId: string = "";
  surveyName: string = "";

  frmSurvey: FormGroup;
  infoFormReset: boolean = false;

  templateHeader: string = "";
  templateMessage: string = "";

  errorMessage: string = "";

  survey: any = {
    surveyInfo: { "surveyId": "", "name": "", "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": null, "endDate": null, "publicationDate": null, "expirationDate": null, "companyId": "" },
    surveyIterations: [],
    questionGroups: [],
    drivers: [],
    questions: []
  };

  constructor(
    private adminService: AdminService,
    private modalService: BsModalService,
    private router: Router) { }

  ngOnInit() {
    this.loading = false;

    this.errorMessage = "";

    this.onClose = new Subject();

    this.setActiveTab("drivers");
    //this.setActiveTab("info");

    console.log("OnInit : ", this.survey.surveyInfo);

    if (this.survey.surveyInfo.companyId == "") {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  groupSelected(event) {
    this.selectedGroup = event;
    this.selectedDriver = null;
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

    if (this.activeTab == "info" || this.activeTab == "iteration" || this.activeTab == "groups") {
      this.selectedGroup = null;
      this.selectedDriver = null;
    }

    if (this.activeTab == "driver") {
      this.selectedDriver = null;
    }

    this.activeTab = tab;
  }

  isDisabledTab(tab) {
    this.activeTab == tab;
    if (tab == "info") {

    }
    return false;
  }

  isIterationTabDisabled() {
    let returnValue: boolean = false;

    //console.log(this.survey.surveyInfo.surveyId);

    if (this.activeTab == "info" && this.survey.surveyInfo.surveyId == "") {
      return true;//!this.validate();
    }

    return returnValue;
  }

  isGroupTabDisabled() {
    let returnValue: boolean = false;

    if (this.activeTab == "info") {
      return true;
    }
    if (this.activeTab == "iteration") {
      return this.survey.surveyIterations == null || this.survey.surveyIterations == undefined || this.survey.surveyIterations.length == 0;
    }
    return returnValue;
  }

  isDriverTabDisabled() {
    let returnValue: boolean = false;

    if (this.activeTab == "info" || this.activeTab == "iteration") {
      return true;
    }

    if (this.activeTab == "groups") {
      if (this.selectedGroup == null) {
        return true;
      }
      else {
        return false;
      }
    }

    return returnValue;
  }

  isQuestionTabDisabled() {
    let returnValue: boolean = false;

    if (this.activeTab == "info" || this.activeTab == "iteration" || this.activeTab == "groups") {
      return true;
    }

    if (this.activeTab == "drivers") {
      if (this.selectedDriver == null) {
        return true;
      }
      else {
        return false;
      }
    }

    return returnValue;
  }
  
  saveSurvey(template: TemplateRef<any>) 
  {
    if (this.activeTab == "info") {
      if (this.validate()) {
        this.loading = true;

	    	this.templateHeader = "Create Survey";

        this.templateMessage = `Are you sue you want to create a Survey : ${this.survey.surveyInfo.name}`;
        this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
        this.surveyName = this.survey.surveyInfo.name;
		
      } else {
        alert('Survey Info In-complete');
      }
    }
    else if (this.activeTab == "iteration") 
    {
      this.loading = true;
	  
      this.templateHeader = "Create Iterations";
      this.templateMessage = `Are you sue you want to save iterations`;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });

    }
    else if (this.activeTab == "groups") 
    {
      this.loading = true;
	       
	    this.templateHeader = "Create Groups";
      this.templateMessage = `Are you sue you want to save question groups`;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });

    } 
    else if (this.activeTab == "drivers") 
    {
      this.loading = true;
	       
	    this.templateHeader = "Create Drivers";
      this.templateMessage = `Are you sue you want to save drivers`;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });

    } 
    else {
      alert('groups Info In-complete');
    }
  }

  public OnYes(): void{
    this.onClose.next(true);
    this.modalRef.hide();

    if(this.activeTab=="info"){

      console.log("Create survey : ", this.survey);

      this.adminService.createSurvey(this.survey.surveyInfo)
        .subscribe(
          data=>{
            console.log("Survey added succcessfully. ",data);

            this.survey.surveyInfo = data;

            this.surveyId = this.survey.surveyInfo.surveyId;

            window.localStorage.setItem("surveyData",JSON.stringify(this.survey));

            this.activeTab="iteration"

            this.loading = false;
          },
          error=>{
            if(error.status == 400){
              this.errorMessage = "Error creating survey";

              console.log("Error creating survey");
            }
          }
        )      
    }
    else if(this.activeTab=="iteration")
    {
      let surveyId = this.survey.surveyInfo.surveyId;

      console.log("Checking survey id : ", surveyId);
      
      this.survey.surveyIterations.forEach(function(x){
        x.surveyId = surveyId;
      });

      console.log("Create iteration", this.survey);

      this.adminService.createIteration(this.survey.surveyIterations)
        .subscribe(
          data=>{
            console.log("Survey Iteration added succcessfully. ",data);

            this.survey.surveyIterations = data;

            window.localStorage.setItem("surveyData",JSON.stringify(this.survey));

            this.activeTab="groups";
          },
          error=>{
            if(error.status == 400){
              this.errorMessage = "Error creating survey iteration";

              console.log("Error creating survey iteration");
            }
          }
        )

        this.loading = false;
    }
    else if(this.activeTab=="groups")
    {
      let surveyId = this.survey.surveyInfo.surveyId;

      console.log("Checking survey id : ", surveyId);
      
      this.survey.questionGroups.forEach(function(x){
        x.surveyId = surveyId;
      });

      console.log("Create Question Groups", this.survey);

      this.adminService.createQuestionGroups(this.survey.questionGroups)
        .subscribe(
          data=>{
            console.log("Survey Question Groups added succcessfully. ",data);

            this.survey.questionGroups = data;

            window.localStorage.setItem("surveyData",JSON.stringify(this.survey));

            this.activeTab="drivers";
          },
          error=>{
            if(error.status == 400){
              this.errorMessage = "Error creating survey question  groups.";

              console.log("Error creating survey question groups.");
            }
          }
        )

        this.loading = false;
    }
    else if(this.activeTab=="drivers")
    {
      let groupId = this.survey.surveyInfo.surveyId;

      console.log("Checking survey id : ", groupId);
      
      // this.survey.questionGroups.forEach(function(x){
      //   x.surveyId = groupId;
      // });

      console.log("Create Drivers", this.survey);

      this.adminService.createDrivers(this.survey.drivers)
        .subscribe(
          data=>{
            console.log("Drivers added succcessfully. ",data);

            this.survey.drivers = data;

            window.localStorage.setItem("surveyData",JSON.stringify(this.survey));

            this.activeTab="questions";
          },
          error=>{
            if(error.status == 400){
              this.errorMessage = "Error creating drivers.";

              console.log("Error creating drivers.");
            }
          }
        )

        this.loading = false;
    }
  }

  public OnNo(): void {
    if (this.activeTab == "info") {
      this.formReset();
    }
    this.infoFormReset = !this.infoFormReset;
    this.loading = false;
    this.onClose.next(false);
    this.modalRef.hide();
  }
  
  validate() {
    if (
      this.survey.surveyInfo.companyId == ""
      || this.survey.surveyInfo.name == ""
      || this.survey.surveyInfo.description == ""
      || this.survey.surveyInfo.welcomeMessage == ""
      || this.survey.surveyInfo.exitMessage == ""
      || this.validDate(this.survey.surveyInfo.startDate)
      || this.validDate(this.survey.surveyInfo.endDate)
      || this.validDate(this.survey.surveyInfo.publicationDate)
      || this.validDate(this.survey.surveyInfo.expirationDate)) {

      return false;
    } else {
      return true;
    }
  }

  validDate(value) {
    return value == null || value == undefined || value.trim() == "" || value == "null"
  }

  private formReset() {
    this.survey.surveyInfo.companyId == "";
    this.survey.surveyInfo.name == "";
    this.survey.surveyInfo.description == "";
    this.survey.surveyInfo.welcomeMessage == "";
    this.survey.surveyInfo.exitMessage == "";
    this.survey.surveyInfo.startDate == null;
    this.survey.surveyInfo.endDate == null;
    this.survey.surveyInfo.publicationDate == null;
    this.survey.surveyInfo.expirationDate == null;
  }

  ngOnDestroy() {

    console.log("ON DESTROY");

    let survey: any = {
      surveyInfo: { "name": "", "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": null, "endDate": null, "publicationDate": null, "expirationDate": null, "companyId": "" },
      surveyIterations: [{ "id": "", "iterationName": "", "surveyId": "", "openDateTime": "", "closeDateTime": "", "reminderDateTime": "", "reminderFrequency": "" }],
      questionGroups: [{ "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "surveyId": "" }],
      drivers: [{ "id": "", "driverName": "", "questionGroupId": "" }],
      questions: [{ "id": "", "questionName": "", "questionText": "", "questionAnswerRequired": null, "questionNumber": "", "questionSequence": 0, "questionTypeName": "", "driverId": "" }]
    };

    //window.sessionStorage.setItem("currentSurvey", JSON.stringify(survey));

    window.localStorage.setItem("surveyData", null);
  }
}
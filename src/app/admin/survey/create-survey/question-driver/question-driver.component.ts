import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-question-driver',
  templateUrl: './question-driver.component.html',
  styleUrls: ['./question-driver.component.css']
})

export class QuestionDriverComponent implements OnInit {

  @Input() surveyObj: any;
  @Input() group: any;
  @Output() selectedDriver: EventEmitter<any> = new EventEmitter<any>();
  
  isEdit: boolean = false;
  modalRef: BsModalRef;

  //driver = { "id": "", "driverName": "", "questions": [] };

  //driver = { "id": "", "driverName": "", "groups": [] };

  driver = { "id": "", "driverName": "", "groupId": "" };
  
  questionGroups = [{ "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "surveyId": "" }];

  errorMesssage: string = "";

  private surveyData: any = [];

  constructor(
    private modalService: BsModalService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.surveyData = window.localStorage.getItem("surveyData"); 
	
    console.log("Survey Data: ", this.surveyData);

    this.loadQuestionGroups("28fdc54a-cc74-4623-b6e2-cc333d57b596"); //this.surveyData.surveyIndfo.surveyId);
  }

  loadQuestionGroups(surveyId){
    this.adminService.getQuestionGroupsForSurvey(surveyId).subscribe(
      data => {
        this.questionGroups = data;
      }
    )
  }

  change() {
    this.errorMesssage = "";
  }

  addNewTrigger(template: TemplateRef<any>) {
    this.isEdit = false;

    //this.driver = { "id": "", "driverName": "", "questions": [] };

    //this.driver = { "id": "", "driverName": "", "groups": [] };

    this.driver = { "id": "", "driverName": "", "groupId": "" };
    
    this.modalRef = this.modalService.show(template);
  }

  editDriver(grp: any, template) {
    this.isEdit = true;
    this.driver = grp;
    this.modalRef = this.modalService.show(template);
  }

  addDriver1() {
    for (let gp of this.surveyObj.drivers) {
      if (gp == this.group) {
        gp.drivers.push(this.driver);

        //this.driver = { "id": "", "driverName": "", "groups": [] };

        this.driver = { "id": "", "driverName": "", "groupId": "" };
        console.log(this.driver);
        this.modalRef.hide();
        this.modalRef = null;
        this.isEdit = false;
        
        return;
      }
    }
  }
  
  addDriver() {
    this.surveyObj.drivers.push(this.driver);
    console.log(this.driver);
    this.driver = { "id": "", "driverName": "", "groupId": "" };
    this.modalRef.hide();
    this.modalRef = null;

    this.isEdit = false;
  }

  updateDriver() {
    for (let gp of this.surveyObj.drivers) {
      if (gp == this.group) {
        for (let dr of gp.drivers) {
          if (dr == this.driver) {

            dr = this.driver;
            
            //this.driver = { "id": "", "driverName": "", "groups": [] };
            this.driver = { "id": "", "driverName": "", "groupId": "" };
            
            this.modalRef.hide();
            this.modalRef = null;
            this.isEdit = false;
            return;
          }
        }
      }
    }
  }
  
  deleteDriver(iter: any) {
    alert('Not Implemented');
  }
  
  addQuestions(driver: any) {
    this.selectedDriver.emit(driver);
  }

  isDisabledInfo() {

    //Fix this


    if (this.driver.driverName == "") {
      return true;
    } 
    // else if (this.driver.groupId == "") {
    //   this.errorMesssage = 'Select a valid group.';
    //   return false;
    // }
    else {
      return false;
    }
  }
}
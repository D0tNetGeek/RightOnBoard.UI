import { Component, OnInit, Input, Output, TemplateRef, EventEmitter  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-question-group',
  templateUrl: './question-group.component.html',
  styleUrls: ['./question-group.component.css']
})
export class QuestionGroupComponent implements OnInit {

  @Input() surveyObj: any;
  
  @Output() selectedGroup :EventEmitter<any> = new EventEmitter<any>();

  modalRef: BsModalRef;

  private surveyData: any = [];

  errorMesssage: string = "";

  //questionGroup = { "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [] };

  questionGroup = { "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "surveyId": "" };

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.surveyData = window.localStorage.getItem("surveyData"); 
	
    console.log("Survey Data: ", this.surveyData);
  }

  addNewTrigger(template: TemplateRef<any>) {
    //this.questionGroup = { "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [] };

    this.questionGroup = { "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "surveyId": "" };
    this.modalRef = this.modalService.show(template);
  }

  editGroup(grp: any, template) {
    this.questionGroup = grp;
    this.modalRef = this.modalService.show(template);
  }

  addGroup() {
    this.surveyObj.questionGroups.push(this.questionGroup);
    this.questionGroup = { "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "surveyId": "" };
    this.modalRef.hide();
    this.modalRef = null;
  }

  deleteGroup(iter: any) {
    alert('Not Implemented');
  }

  addDrivers(group:any) {
    this.selectedGroup.emit(group);
  }
  
  validDate(value) {
    return value == null || value == undefined || value.trim() == "" || value == "null"
  }

  validate() {
    this.errorMesssage = "";

    if (this.questionGroup.questionGroupName == "") {
      this.errorMesssage = "Question Group Name can't be empty!";
      return false;
    }
    if (this.questionGroup.questionGroupDescription == "") {
      this.errorMesssage = "Question Group Description can't be empty!";
      return false;
    }

    return true;
  }

  isDisabledInfo() {
    if (this.questionGroup.questionGroupName == "" || this.questionGroup.questionGroupDescription == "") {
      return true;
    }
    
    if(!this.validate()){
      return true;
    }
    
    return false;
  }
}

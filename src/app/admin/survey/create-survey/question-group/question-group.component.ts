import { Component, OnInit, Input, Output, TemplateRef, EventEmitter  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-question-group',
  templateUrl: './question-group.component.html',
  styleUrls: ['./question-group.component.css']
})
export class QuestionGroupComponent implements OnInit {


  questionGroup = { "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [] };
  @Input() surveyObj: any;
  
  @Output() selectedGroup :EventEmitter<any> = new EventEmitter<any>();

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  addNewTrigger(template: TemplateRef<any>) {
    this.questionGroup = { "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [] };
    this.modalRef = this.modalService.show(template);
  }
  editGroup(grp: any, template) {
    this.questionGroup = grp;
    this.modalRef = this.modalService.show(template);
  }
  addGroup() {
    this.surveyObj.questionGroups.push(this.questionGroup);
    this.questionGroup = { "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [] };
    this.modalRef.hide();
    this.modalRef = null;
  }
  deleteGroup(iter: any) {
    alert('Not Implemented');
  }
  addDrivers(group:any) {
    this.selectedGroup.emit(group);
  }
  errorMesssage: string = "";

  isDisabledInfo() {
    if (this.questionGroup.questionGroupName == ""
      || this.questionGroup.questionGroupDescription == ""
    ) {
      return true;
    } else {
      return false;
    }
  }


}

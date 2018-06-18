import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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

  driver = { "id": "", "driverName": "", "groups": [] };
  
  errorMesssage: string = "";

  private surveyData: any = [];

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.surveyData = window.localStorage.getItem("surveyData"); 
	
    console.log("Survey Data: ", this.surveyData);
  }

  addNewTrigger(template: TemplateRef<any>) {
    this.isEdit = false;

    //this.driver = { "id": "", "driverName": "", "questions": [] };

    this.driver = { "id": "", "driverName": "", "groups": [] };
    
    this.modalRef = this.modalService.show(template);
  }

  editDriver(grp: any, template) {
    this.isEdit = true;
    this.driver = grp;
    this.modalRef = this.modalService.show(template);
  }

  addDriver() {
    for (let gp of this.surveyObj.questionGroups) {
      if (gp == this.group) {
        gp.drivers.push(this.driver);

        this.driver = { "id": "", "driverName": "", "groups": [] };
        
        this.modalRef.hide();
        this.modalRef = null;
        this.isEdit = false;
        
        return;
      }
    }
  }
  
  updateDriver() {
    for (let gp of this.surveyObj.questionGroups) {
      if (gp == this.group) {
        for (let dr of gp.drivers) {
          if (dr == this.driver) {
            dr = this.driver;
            this.driver = { "id": "", "driverName": "", "groups": [] };
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
    if (this.driver.driverName == ""
    ) {
      return true;
    } else {
      return false;
    }
  }
}
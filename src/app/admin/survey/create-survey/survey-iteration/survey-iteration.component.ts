import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-survey-iteration',
  templateUrl: './survey-iteration.component.html',
  styleUrls: ['./survey-iteration.component.css']
})
export class SurveyIterationComponent implements OnInit {

  @Input() surveyObj: any;
  
  iteration = { "id": "", "surveyId": "", "iterationName": "", "openDateTime": "", "closeDateTime": "", "reminderDateTime": "", "reminderFrequency": "" };
  modalRef: BsModalRef;
  
  private surveyData: any = [];

  errorMesssage: string = "";

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.surveyData = window.localStorage.getItem("surveyData");

    console.log("Survey Data: ", this.surveyData);
  }

  addNewTrigger(template: TemplateRef<any>) {
    this.iteration = { "id": "", "iterationName": "", "surveyId": "", "openDateTime": "", "closeDateTime": "", "reminderDateTime": "", "reminderFrequency": "" };
    this.modalRef = this.modalService.show(template);
  }

  editIteration(iter: any, template) {
    this.iteration = iter;
    this.modalRef = this.modalService.show(template);
  }

  addIteration() {
    this.surveyObj.surveyIterations.push(this.iteration);

    this.iteration = { "id": "", "surveyId": "", "iterationName": "", "openDateTime": "", "closeDateTime": "", "reminderDateTime": "", "reminderFrequency": "" };
    this.modalRef.hide();
    this.modalRef = null;
  }

  deleteIteration(iter:any){
    let index=-1;
    
    for(let temp of this.surveyObj.surveyIterations)
    {
      index++;
    
      if(temp==iter){
        this.surveyObj.surveyIterations.splice(index,1)
      }
    }
  }
  
  validate() {
    this.errorMesssage = "";

    if ((this.iteration.openDateTime != "" && this.iteration.closeDateTime != "") && this.iteration.openDateTime > this.iteration.closeDateTime) {
      this.errorMesssage = "Close Date should be greater than Open Date";
      
      return;
    }
  }
  
  isDisabledInfo() {
    if (this.iteration.openDateTime == ""
      || this.iteration.closeDateTime == ""
    ) 
    {
      return true;
    } else {
      if (this.iteration.openDateTime > this.iteration.closeDateTime) {
        return false;
      }
    
      return false;
    }
  }
}

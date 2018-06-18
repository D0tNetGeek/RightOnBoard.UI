import { Component, OnInit, OnDestroy, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() surveyObj: any;
  @Input() group: any;
  @Input() driver: any;
  
  isEdit: boolean = false;
  modalRef: BsModalRef;

  question = { "id": "", "questionName": "", "questionText": "", "questionAnswerRequired": true, "questionNumber": "", "questionSequence": -1, "questionTypeName": "yes/no", "choices": [], "drivers": [] };

  private surveyData: any = [];

  errorMesssage: string = "";

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.surveyData = window.localStorage.getItem("surveyData"); 
	
    console.log("Survey Data: ", this.surveyData);
  }

  addNewTrigger(template: TemplateRef<any>) {
    this.isEdit = false;
    this.question = { "id": "", "questionName": "", "questionText": "", "questionAnswerRequired": true, "questionNumber": "", "questionSequence": -1, "questionTypeName": "yes/no", "choices": [], "drivers": [] };

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  editQuestion(ques: any, template) {
    this.isEdit = true;
    this.question = ques;
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  addQuestion() {
    for (let gp of this.surveyObj.questionGroups) {
      if (gp == this.group) {
        for (let dri of gp.drivers) {
          if (dri == this.driver) {
    
            dri.questions.push(this.question);
    
            this.question = { "id": "", "questionName": "", "questionText": "", "questionAnswerRequired": true, "questionNumber": "", "questionSequence": -1, "questionTypeName": "yes/no", "choices": [], "drivers": [] };
            this.modalRef.hide();
            this.modalRef = null;
            this.isEdit = false;
    
            return;
          }
        }
      }
    }
  }
  
  updateQuestion() {
    for (let gp of this.surveyObj.questionGroups) {
      if (gp == this.group) {
        for (let dr of gp.drivers) {
          if (dr == this.driver) {
            for (let que of dr.questions) {
              if (que == this.question) {
                que = this.question;
                this.question = { "id": "", "questionName": "", "questionText": "", "questionAnswerRequired": true, "questionNumber": "", "questionSequence": -1, "questionTypeName": "yes/no", "choices": [], "drivers": [] };
                this.modalRef.hide();
                this.modalRef = null;
                this.isEdit = false;
                return;
              }
            }
          }
        }
      }
    }
  }
  
  deleteQuestion(iter: any) {
    alert('Not Implemented');
  }

  isDisabledInfo() {
    if (this.question.questionName == "" ||
      this.question.questionText == "" ||
      this.question.questionAnswerRequired == null ||
      this.question.questionNumber == "" ||
      this.question.questionSequence == -1 ||
      this.question.questionTypeName == ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  addNewOption() {
    this.question.choices.push({ "choiceValue": "", "choiceText": "" })
  }

  deleteOption(choice) {
    let index=-1;
    for (let option of this.question.choices) {
      index++;
      if (option == choice) {
        this.question.choices.splice(index,1)
      }
    }

  }
}
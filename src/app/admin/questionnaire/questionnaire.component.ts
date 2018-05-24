import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  constructor(private questionnaireService: QuestionnaireService, private router: Router,
    private route: ActivatedRoute) { }

    color: String = "red";
    class: String = "";
    survey: any = {
      surveyInfo: { "surveyId": "", "name": "", "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": "", "endDate": "", "publicationDate": "", "expirationDate": "" },
      questionGroups: [{ "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [{ "id": "", "driverName": "", "questions": [{ "id": "", "questionName": "", "questionText": "", "questionAnswerRequired": null, "questionNumber": "", "questionSequence": 0, "questionTypeName": "" }] }] }]
    };
  
    currentQuestionGroup: string = "";
    currentQuestionGroupDriver: string = "";
    firstQuestionId: string = "";
    secondQuestionId: string = "";
    firstQuestion: any = {};
    secondQuestion: any = {};
    surveyCompleted: boolean = false;
    totalNumberOfQuestions = 0;
    numberOfAnswered = 0;

    getRandomColor() {
      let randColors = ["purple", "blue", "green", "orange", "red"];
      return randColors[Math.round((Math.random() * 1000)) % 5];
    }

    getRandomColorClass() {
      let randClass = ["card-header-primary", "card-header-info", "card-header-success", "card-header-warning", "card-header-danger", "card-header-rose"];
      return randClass[Math.round((Math.random() * 1000)) % 6];
    }

    ngOnInit() {
      this.color = this.getRandomColor();
      this.class = this.getRandomColorClass();
      this.survey = JSON.parse(window.sessionStorage.getItem("currentSurvey"));
      this.initialiseSurveyQuestions();
  
      this.currentQuestionGroup = this.survey.questionGroups[0].questionGroupId;
      this.currentQuestionGroupDriver = this.survey.questionGroups[0].drivers[0].id;

      if (this.survey.questionGroups[0].drivers[0].questions[0]) {
        this.firstQuestionId = this.survey.questionGroups[0].drivers[0].questions[0].id;
        this.firstQuestion = this.survey.questionGroups[0].drivers[0].questions[0];
      }

      if (this.survey.questionGroups[0].drivers[0].questions[1]) {
        this.secondQuestionId = this.survey.questionGroups[0].drivers[0].questions[1].id;
        this.secondQuestion = this.survey.questionGroups[0].drivers[0].questions[1];
      }

      this.surveyCompleted = false;
    }

    initialiseSurveyQuestions() {
      this.totalNumberOfQuestions = 0;
      this.numberOfAnswered = 0;
      let options = [];

      for (let questionGroup of this.survey.questionGroups) {
        for (let driver of questionGroup.drivers) {
          for (let question of driver.questions) {
            this.totalNumberOfQuestions++;
            options = [];
            if (question.questionTypeName == 'yes/no') {
              options.push({ "value": "Yes" })
              options.push({ "value": "No" })
            }

            if (question.questionTypeName == 'true/false') {
              options.push({ "value": "True" })
              options.push({ "value": "False" })
            }

            if (question.questionTypeName == 'multipleChoice') {
              for (let temp of question.options) {
                options.push({ "value": temp.value })
              }
            }

            question.options = options;
          }
        }
      }
    }

    activeQuestionGroup(questionGroup:any){
      return questionGroup.questionGroupId==this.currentQuestionGroup;
    }

    continueQuiz() {
      let queGroupIndex = -1;
      for (let questionGroup of this.survey.questionGroups) {
        queGroupIndex++;
        if (questionGroup.questionGroupId == this.currentQuestionGroup) {
          let driverIndex = -1;
          for (let driver of questionGroup.drivers) {
            driverIndex++;
            if (driver.id == this.currentQuestionGroupDriver) {
              let questionIndex = -1;
              for (let question of driver.questions) {
                questionIndex++;
                if (question.id == this.firstQuestionId) {
                  if (driver.questions.length == questionIndex + 1) {
                    if (questionGroup.drivers.length > (driverIndex + 1)) {
                      this.currentQuestionGroupDriver = this.survey.questionGroups[queGroupIndex].drivers[driverIndex + 1].id;
                      if (this.survey.questionGroups[queGroupIndex].drivers[driverIndex + 1].questions[0]) {
                        this.firstQuestionId = this.survey.questionGroups[queGroupIndex].drivers[driverIndex + 1].questions[0].id;
                        this.firstQuestion = this.survey.questionGroups[queGroupIndex].drivers[driverIndex + 1].questions[0];
                      }
                      if (this.survey.questionGroups[queGroupIndex].drivers[driverIndex + 1].questions[1]) {
                        this.secondQuestionId = this.survey.questionGroups[queGroupIndex].drivers[driverIndex + 1].questions[1].id;
                        this.secondQuestion = this.survey.questionGroups[queGroupIndex].drivers[driverIndex + 1].questions[1];
                      }
                      return;
                    } else {
                      if (this.survey.questionGroups.length > (queGroupIndex + 1)) {
                        this.currentQuestionGroup = this.survey.questionGroups[queGroupIndex + 1].questionGroupId;
                        this.currentQuestionGroupDriver = this.survey.questionGroups[queGroupIndex + 1].drivers[0].id;
                        if (this.survey.questionGroups[queGroupIndex + 1].drivers[0].questions[0]) {
                          this.firstQuestionId = this.survey.questionGroups[queGroupIndex + 1].drivers[0].questions[0].id;
                          this.firstQuestion = this.survey.questionGroups[queGroupIndex + 1].drivers[0].questions[0];
                        }
                        if (this.survey.questionGroups[queGroupIndex + 1].drivers[0].questions[1]) {
                          this.secondQuestionId = this.survey.questionGroups[queGroupIndex + 1].drivers[0].questions[1].id;
                          this.secondQuestion = this.survey.questionGroups[queGroupIndex + 1].drivers[0].questions[1];
                        }
                        return;
                      } else {
                        //this.surveyCompleted = true;
                      }
  
                    }
                  } else {
                    this.firstQuestionId = driver.questions[questionIndex + 2].id;
                    this.firstQuestion = driver.questions[questionIndex + 2];
                    if (driver.questions[questionIndex + 3]) {
                      this.secondQuestionId = driver.questions[questionIndex + 3].id;
                      this.secondQuestion = driver.questions[questionIndex + 3];
                    } else {
                      this.secondQuestionId = "-1";
                      this.secondQuestion = null;;
                    }
                    return;
                  }
  
                }
              }
            }
          }
        }
      }
    }

    isDefined(value: any) {
      if (value == null || value == undefined || value == "") {
        return false;
      } else {
        return true;
      }
    }

    submissionMessage: string = "";

    chooseAnswer(question: any, option: string, quePosition: number) {
      if (!this.isDefined(question.userSelection)) {
        this.numberOfAnswered++;
        if (this.numberOfAnswered == this.totalNumberOfQuestions) {
          this.surveyCompleted = true;
          this.submissionMessage = "Saving your responses.."
          // this.questionnaireService.submitSurvey('101', this.survey)
          //   .subscribe(
          //     data => {
          //      if (data == true) {
          //         this.submissionMessage = "";
          //       } else {
          //         this.submissionMessage = "Error Occured while saving..";
          //       }
          //     })
        }
      }

      question.userSelection = option;
      if (quePosition == 1) {
        this.firstQuestion.userSelection = option;
      }

      if (quePosition == 2) {
        this.secondQuestion.userSelection = option;
      }

      /*
      if(this.firstQuestion.userSelection!=undefined && (this.secondQuestion == null  || this.secondQuestion.userSelection!=undefined)){
        setTimeout(()=>{
          this.continueQuiz();},4000); 
       
      }*/
    }

    answeredQuestions() {
      if ((this.firstQuestion.userSelection == undefined || this.firstQuestion.userSelection == "") || (this.secondQuestion != null && (this.secondQuestion.userSelection == undefined || this.secondQuestion.userSelection == ""))) { return true }
      else { return false }
    }

    ngOnDestroy() {
      window.sessionStorage.removeItem("currentSurvey");
    }

    canDeactivate(): Observable<boolean> | boolean {
      if (this.numberOfAnswered == 0 || this.surveyCompleted) {
        return true;
      }
      return confirm('You are about to leave the page without completing the Survey. Do you want to continue?');
    }

    participateSurvey(survey: any) {
      window.sessionStorage.setItem("currentSurvey", JSON.stringify(survey));
      this.router.navigate(["/user/survey"]);
    }
    
    startTimer(){
      this.questionnaireService.timer = setInterval(()=>{
        this.questionnaireService.seconds++;
      }, 1000);
    }

}

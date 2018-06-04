import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service'
import { HealthCheckService } from '../services/healthcheck.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class UserSurveyComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private healthCheckService: HealthCheckService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  color: String = "red";
  class: String = "";

  survey: any = {
    surveyInfo: { "surveyId": "", "name": "", "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": "", "endDate": "", "publicationDate": "", "expirationDate": "" },
    questionGroups: [{ "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [{ "id": "", "driverName": "", "questions": [{ "id": "", "questionName": "", "questionText": "", "questionAnswerRequired": null, "questionNumber": "", "questionSequence": 0, "questionTypeName": "" }] }] }]
  };

  pageNo: any = 1;

  currentQuestionGroup: string = "";
  currentQuestionGroupDriver: string = "";
  firstQuestionId: string = "";
  secondQuestionId: string = "";
  firstQuestion: any = {};
  secondQuestion: any = {};
  surveyCompleted: boolean = false;
  totalNumberOfQuestions = 0;
  numberOfAnswered = 0;

  surveyAnswers = [];
  surveyAnswer = { "questionId": "", "optionId": "", "optionValue": "" }

  submissionMessage: string = "";

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
      this.getNumberOfQuestions(questionGroup);

      for (let driver of questionGroup.drivers) {

        for (let question of driver.questions) {

          this.totalNumberOfQuestions++;
          options = [];

          if (question.questionTypeName == 'yes/no') {
            options.push({ "id": "1", "value": "Yes" })
            options.push({ "id": "0", "value": "No" })
          }

          if (question.questionTypeName == 'true/false') {
            options.push({ "id": "1", "value": "True" })
            options.push({ "id": "0", "value": "False" })
          }

          if (question.questionTypeName == 'multipleChoice') {
            for (let temp of question.options) {
              options.push({ "id": `"${temp.id}"`, "value": `"${temp.value}"` })
            }
          }

          question.options = options;
        }
      }
    }
  }

  activeQuestionGroup(questionGroup: any) {
    return questionGroup.questionGroupId == this.currentQuestionGroup;
  }
  
  continueSurvey() {

    this.surveyAnswers = [];

    if (this.firstQuestion) {
      this.surveyAnswers.push({ "questionId": `${this.firstQuestion.id}`, "optionId": `${this.firstQuestion.userSelection.id}`, "optionValue": `${this.firstQuestion.userSelection.value}` })
    }

    if (this.secondQuestion) {
      this.surveyAnswers.push({ "questionId": `${this.secondQuestion.id}`, "optionId": `${this.secondQuestion.userSelection.id}`, "optionValue": `${this.secondQuestion.userSelection.value}` })
    }

    this.submitSurvey();

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
                      this.surveyCompleted = true;
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

  goBackQuiz() {
    this.surveyAnswers = [];

    if (this.firstQuestion && this.firstQuestion.userSelection.value!=undefined) {
      this.surveyAnswers.push({ "questionId": `${this.firstQuestion.id}`, "optionId": `${this.firstQuestion.userSelection.id}`, "optionValue": `${this.firstQuestion.userSelection.value}` })
    }

    if (this.secondQuestion && this.secondQuestion.userSelection.value!=undefined) {
      this.surveyAnswers.push({ "questionId": `${this.secondQuestion.id}`, "optionId": `${this.secondQuestion.userSelection.id}`, "optionValue": `${this.secondQuestion.userSelection.value}` })
    }

    if (this.surveyAnswers.length > 0) {
      this.submitSurvey();
    }

    this.pageNo = parseInt('' + this.pageNo) - 1;

    let queGroupIndex = -1;

    let tempPageNo = 0;

    for (let questionGroup of this.survey.questionGroups) {
      queGroupIndex++;
      let driverIndex = -1;
      for (let driver of questionGroup.drivers) {
        driverIndex++;
        let questionIndex = -1;
        for (let count = 0; count < driver.questions.length; count++) {
          tempPageNo++;
          questionIndex++;
          this.currentQuestionGroupDriver = this.survey.questionGroups[queGroupIndex].drivers[driverIndex].id;
          if (this.survey.questionGroups[queGroupIndex].drivers[driverIndex].questions[questionIndex]) {
            this.firstQuestionId = this.survey.questionGroups[queGroupIndex].drivers[driverIndex].questions[questionIndex].id;
            this.firstQuestion = this.survey.questionGroups[queGroupIndex].drivers[driverIndex].questions[questionIndex];
          }
          questionIndex++;
          if (this.survey.questionGroups[queGroupIndex].drivers[driverIndex].questions[questionIndex]) {
            count++;
            this.secondQuestionId = this.survey.questionGroups[queGroupIndex].drivers[driverIndex].questions[questionIndex].id;
            this.secondQuestion = this.survey.questionGroups[queGroupIndex].drivers[driverIndex].questions[questionIndex];
          } else {
            this.secondQuestionId = "-1";
            this.secondQuestion = null;;
          }

          if (parseInt(this.pageNo) == tempPageNo) {
            this.currentQuestionGroup = questionGroup.questionGroupId;
            this.currentQuestionGroupDriver = driver.id;
            return;
          }
        }
      }
    }
  }

  getNumberOfQuestions(questionGroup: any) {
    questionGroup.questionsToBeAnswered = 0;
    let count = 0;
    for (let driver of questionGroup.drivers) {
      count += driver.questions.length;
    }
    questionGroup.questionsToBeAnswered = count;
  }

  isDefined(option: any) {
    if (option == null || option.value == null || option.value == undefined || option == "") {
      return false;
    } else {
      return true;
    }
  }

  submitSurvey() {
    //this.submissionMessage = "Saving your responses!!!..";
    /* for (let questionGroup of this.survey.questionGroups) {
       for (let driver of questionGroup.drivers) {
         for (let question of driver.questions) {
           this.surveyAnswers.push({ "questionId": `${question.id}`, "optionId": `${question.userSelection.id}`, "optionValue": `${question.userSelection.value}` })
         }
       }
     }*/
    this.healthCheckService.submitSurvey('101', this.survey.surveyInfo.surveyId, this.surveyAnswers)
      .subscribe(
        data => {
          if (data == true) {
            // this.submissionMessage = "";
          } else {
            //his.submissionMessage = "Error Occured while saving..";
          }
        })
  }

  chooseAnswer(questionGroup: any, question: any, option: any, quePosition: number) {
    if (this.isDefined(question.userSelection)) {
      if ((option.value == 'True' || option.value == 'Yes') && (question.userSelection.value == 'False' || question.userSelection.value == 'No')) {
        questionGroup.questionsToBeAnswered--;
        question.userSelection = option;
        //this.numberOfAnswered++;
      } else if ((option.value == 'False' || option.value == 'No') && (question.userSelection.value == 'True' || question.userSelection.value == 'Yes')) {
        questionGroup.questionsToBeAnswered++;
        question.userSelection = option;
        //this.numberOfAnswered++;
      }

    } else if (!this.isDefined(question.userSelection)) {
      if (option.value == 'False' || option.value == 'No') {
        question.userSelection = option;
        this.numberOfAnswered++;
      } else {
        questionGroup.questionsToBeAnswered--;
        question.userSelection = option;
        this.numberOfAnswered++;
      }
      /*if (this.numberOfAnswered == this.totalNumberOfQuestions) {
        this.surveyCompleted = true;
        this.submitSurvey();
        return;
      }*/
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

  checked(userSelection: any, option: any) {
    if (userSelection == null || userSelection.value == null) { return false }
    if (userSelection.value == option.value) { return true } else { return false }
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

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { QuestionnaireService } from '../services/questionnaire.service'
import { AuthenticationService } from '../../core/services';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  loading: boolean = false;
  private user: any = {};

  constructor(private questionnaireService: QuestionnaireService, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) { }

    color: String = "red";
    class: String = "";

    survey: any = [{
      surveyInfo: { "surveyId": "", "name": "", "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": "", "endDate": "", "publicationDate": "", "expirationDate": "" },
      questionGroups: [{ "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [{ "id": "", "driverName": "", "questions": [{ "id": "", "questionName": "", "questionText": "", "questionAnswerRequired": null, "questionNumber": "", "questionSequence": 0, "questionTypeName": "" }] }] }]
    }];
  
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
      this.loading = false;

      // window.sessionStorage.setItem("currentSurvey", null);
      // this.color = this.getRandomColor();
      // this.class = this.getRandomColorClass();
      // this.getSurveys();

      this.user = this.authService.getAuthUser();

      this.color = this.getRandomColor();
      this.class = this.getRandomColorClass();

      console.info("JSON Surveys : ",JSON.parse(window.sessionStorage.getItem("currentSurvey")));
      
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

      console.log("Surveys in Survey : ", this.survey.questionGroups);

      for (let questionGroup of this.survey.questionGroups) {
        for (let driver of questionGroup.drivers) {
          for (let question of driver.questions) {
            this.totalNumberOfQuestions++;
            options = [];
            if (question.questionTypeName == 'yes/no') {
              options.push({ "id": "1", "value": "Yes" })
              options.push({ "id":"0", "value": "No" })
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

    isDefined(option: any) {
      if (option == null || option.value == null || option.value == undefined || option == "") {
        return false;
      } else {
        return true;
      }
    }

    surveyAnswers = [];
    surveyAnswer = { "questionId": "", "optionId": "", "optionValue": "" }

    submitSurvey() {
      this.submissionMessage = "Saving your responses!!!..";
      for (let questionGroup of this.survey.questionGroups) {
        for (let driver of questionGroup.drivers) {
          for (let question of driver.questions) {
          this.surveyAnswers.push({ "questionId": `${question.id}`, "optionId": `${question.userSelection.id}`, "optionValue": `${question.userSelection.value}` })
          }
        }
    }

    this.questionnaireService.submitSurvey('101', this.survey.surveyInfo.surveyId, this.surveyAnswers)
      .subscribe(
        data => { 
          if (data == true) {
            this.submissionMessage = "";
          } else {
            this.submissionMessage = "Error Occured while saving..";
          }
        })
    }

    submissionMessage: string = "";

    chooseAnswer(question: any, option: string, quePosition: number) {
        if (!this.isDefined(question.userSelection)) {
          question.userSelection = option;
          this.numberOfAnswered++;
            if (this.numberOfAnswered == this.totalNumberOfQuestions) {
              this.surveyCompleted = true;
              this.submitSurvey();
              return;
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
  
    // getSurveys() {
    //   // this.questionnaireService.getActiveSurveys('101')
    //   //   .subscribe(
    //   //     data => {
    //   //       if (data == undefined || data == null) {
    //   //       } else {
    //   //         this.surveys = data;
    //   //       }
    //   //     })

    //   this.surveys = [{
    //     surveyInfo:{
    //     id :"CF4252A6-073C-4824-9619-F24B13FC3ED8",
    //     name: "First Questionnaire",
    //     description: "This is first questionnaire",
    //     endDate: "2018-04-25 13:34:09.0000000",
    //     expirationDate: "2018-04-28 10:34:09.0000000",
    //     startDate: "2018-04-25 10:34:09.0000000",
    //     welcomeMessage: "Welcome to the Questionnaire"
    //   }}];
    // }
  
    participateSurvey(survey: any) {
      window.sessionStorage.setItem("currentSurvey", JSON.stringify(survey));
      this.router.navigate(["/admin/questionnaire"]);
    }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.css']
})
export class UserProgressComponent implements OnInit {
  currentSurvey: any = {
    surveyInfo: { "surveyId": "", "name": "", "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": "", "endDate": "", "publicationDate": "", "expirationDate": "" },
    questionGroups: [{ "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [{ "id": "", "driverName": "", "questions": [{ "id": "", "questionName": "", "questionText": "", "questionAnswerRequired": null, "questionNumber": "", "questionSequence": 0, "questionTypeName": "" }] }] }]
  };
  constructor(private http: HttpClient) { }
 

  ngOnInit() {
    this.http.get('./assets/user-survey.json').subscribe(
      data => {
        this.currentSurvey=data;
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
   
  } 

  getClass(question){
    return question.questionGroupName;
  }
  getTitle(driver,question){
    return 'Driver :'+driver.driverName+"\n"+question.questionText;
  }
  selectedQuestion:any=null;
  selectQuestion(question){
    this.selectedQuestion=question
  }
}

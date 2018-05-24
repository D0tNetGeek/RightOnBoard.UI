import { Component, OnInit } from '@angular/core';
import { HealthCheckService } from '../services/healthcheck.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {
  constructor(
    private healthCheckService: HealthCheckService, 
    private router: Router,
    private route: ActivatedRoute) { }

  color: String = "red";
  class: String = "";

  surveys: any = [{
    surveyInfo: { "surveyId": "", "name": "", "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": "", "endDate": "", "publicationDate": "", "expirationDate": "" },
    questionGroups: [{ "questionGroupId": "", "questionGroupName": "", "questionGroupDescription": "", "drivers": [{ "id": "", "driverName": "", "questions": [{ "id": "", "questionName": "", "questionText": "", "questionAnswerRequired": null, "questionNumber": "", "questionSequence": 0, "questionTypeName": "" }] }] }]
  }];

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
    //this.router.navigate(["/user/user-health-check"]);
  }
}

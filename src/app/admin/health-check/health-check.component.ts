import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { QuestionnaireService } from '../services/questionnaire.service';
import { AuthenticationService } from '../../core';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css']
})
export class HealthCheckComponent implements OnInit {
  
  loading: boolean = false;
  private user: any = {};

  isAdmin = false;
  isUser = false;

  healthChecks: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private questionnaireService: QuestionnaireService, 
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAuthUserInRole("Admin");

    this.loading = false;
    this.user = this.authService.getAuthUser();
    //this.getSurveysListForUser()
    this.getHealthChecksForUser();
  }

  isDisabled(healthCheck: any) {
    if (healthCheck == null || healthCheck == undefined || healthCheck.surveyStatus.toLowerCase() != 'awaiting start') {
      return true;
    } else { return false; }

  }

  buttonClick(healthCheck: any) {
    this.loading = true;

    if (healthCheck.surveyStatus.toLowerCase() == 'awaiting start') {      
      this.questionnaireService.getSurveyForIteration('101', healthCheck.id)
        .subscribe(
          data => {
            if (data == undefined || data == null) {
              alert('Error Occured');
            } else {
              window.sessionStorage.setItem("currentSurvey", JSON.stringify(data));
              this.router.navigate(["/user/survey"]);

            }
          })
    }
    else{
      console.info("Selected HealthCheck : ",healthCheck);

      if(confirm("Are you sure you want to initiate Survey for this HealthCheck : " + healthCheck.iterationName)){
        
        this.questionnaireService.getSurveyForIteration(this.user.userId, healthCheck.iterationId)
        .subscribe(
          data => {
            if (data == undefined || data == null) {
              alert('Error Occured');
            } else {
              console.log("getSurveyForIteration : ", data);

              window.sessionStorage.setItem("currentSurvey", JSON.stringify(data));
              this.loading = false;
              //this.router.navigate(["/admin/survey-welcome/"+ this.user.userId + "/" + healthCheck.surveyInfo.surveyId + "/" + healthCheck.iterationId]);
              this.router.navigate(["/admin/survey-welcome"]);

            }
          })        
      }
      else{
        this.loading = false;
        console.log("No");
      }
    }
  }

  //getSurveysListForUser() {
    getHealthChecksForUser(){
    this.loading = true;
    
    console.info("User Id in health checks : ", this.user.userId);

    //this.questionnaireService.getSurveyListForUser('101')
    this.questionnaireService.getHealthChecksForUser(this.user.userId)
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {            
            console.log("User in Health Check: ",this.user);
            this.loading = false;
            this.healthChecks = data;
          }
        })
  }
}

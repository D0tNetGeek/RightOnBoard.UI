import { Component, OnInit, TemplateRef } from '@angular/core';
import { HealthCheckService } from '../services/healthcheck.service'
import { Router, ActivatedRoute } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs/Subject';

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
  iterations: any = [];

  iterationName: string = "";
  
  public modalRef: BsModalRef;
  public onClose: Subject<boolean>;

  currentDate: Date = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private modalService: BsModalService,
    private healthCheckService: HealthCheckService) { }

  ngOnInit() {
    this.loading = false;
    //this.getIterationListForUser()

    this.onClose = new Subject();

    this.getHealthChecksIterationsForUser();
  }

  isDisabled(questionnaire: any) {
    if (questionnaire == null || questionnaire == undefined || questionnaire.status.toLowerCase() != 'awaiting start') {
      return true;
    } else { return false; }

  }
  
  healthCheck:any=null;
  
  startHealthCheck(template: TemplateRef<any>, healthCheck: any) {
    this.loading = true;
    this.healthCheck=healthCheck;
    // if (healthCheck.surveyStatus != undefined && healthCheck.surveyStatus.toLowerCase() == 'awaiting start') {      
    //   this.healthCheckService.getSurveyForIteration(healthCheck.id)
    //     .subscribe(
    //       data => {
    //         if (data == undefined || data == null) {
    //           alert('Error Occured');
    //         } else {
    //           window.sessionStorage.setItem("currentSurvey", JSON.stringify(data));
    //           this.router.navigate(["/user/survey"]);

    //         }
    //       })
    // }
    // else
    // {
      console.info("Selected HealthCheck : ",healthCheck);

      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
      this.iterationName = healthCheck.iterationName;
      //this.modalRef.content.iterationName = healthCheck.iterationName;

      console.log("Modal Ref :",this.modalRef);

      // this.modalRef.content.onClose.subscribe(result => {
      //   console.log("Results : ", result);
      // });

     
  }

  public OnYes(): void{
    this.onClose.next(true);
    this.modalRef.hide();
    this.healthCheckService.getSurveyForIteration(this.healthCheck.iterationId)
    .subscribe(
      data => {
        if (data == undefined || data == null) {
          alert('Error Occured');
        } else {
          console.log("getSurveyForIteration : ", data);

          window.sessionStorage.setItem("currentSurvey", JSON.stringify(data));
          this.loading = false;
          //this.router.navigate(["/admin/survey-welcome/"+ this.user.userId + "/" + healthCheck.surveyInfo.surveyId + "/" + healthCheck.iterationId]);
          this.router.navigate(["/user/survey-welcome"]);

        }
      })  
  }

  public OnNo(): void{
    this.healthCheck=null;
    this.loading = false;
    this.onClose.next(false);
    this.modalRef.hide();
  }
  

  //getSurveysListForUser() {
  getHealthChecksIterationsForUser(){
    this.loading = true;
    
    //console.info("User Id in health checks : ", this.user.userId);

    //this.questionnaireService.getSurveyListForUser('101')
    this.healthCheckService.getHealthChecksIterationsForUser()
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {            
            //console.log("User in Health Check: ",this.user);
            this.loading = false;
            this.healthChecks = data;
          }
        })
  }

  getIterationListForUser() {
    this.healthCheckService.getIterationListForUser('101')
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.iterations = data;
          }
        })
  }

  checkActive(iteration: any) {
    let startDate: Date = new Date(iteration.startDate);
    let completionDate: Date = new Date(iteration.completedDate);
    let returnValue = 'Pending';

    if (completionDate > this.currentDate && startDate <= this.currentDate) { returnValue = 'Active' }
    if (completionDate < this.currentDate) { returnValue = 'Expired' }
    if (startDate > this.currentDate) { returnValue = 'Pending' }

    return returnValue
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-survey-mgmt',
  templateUrl: './survey-mgmt.component.html',
  styleUrls: ['./survey-mgmt.component.css']
})
export class SurveyMgmtComponent implements OnInit, OnDestroy {

  loading: boolean = false;

  surveysList: any = [];
  // surveyList: any = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private adminService: AdminService) { }

  ngOnInit() {

    this.loading = false;

    let surveysList: any = {
      "surveyId": "", "name": "", "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": "", "endDate": "", "expirationDate": "", "publicationDate": ""
    };

    // let survey: any = {
    //   surveyInfo: { "surveyId": "", "name": "", "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": "", "endDate": "", "expirationDate": "", "publicationDate": ""},
    //   questionGroups: [],
    //   surveyIterations: []
    // };

    window.sessionStorage.setItem("currentSurvey", JSON.stringify(surveysList));

    this.getSurveyListForAdmin();
  }

  ngOnDestroy(){

  }

  createSurvey(){
    this.router.navigate(["/admin/createSurvey"]);
  }

  getSurveyListForAdmin(){
    
    this.loading = true;

    this.adminService.getSurveyListForAdmin()
    .subscribe(
      data => {
        if(data == undefined || data ==null){
          alert("No Survey Data Available !!");
        }else{
          this.surveysList = data;
          this.loading = false;
        }
      }
    )
  }

  editSurvey(survey){
    this.adminService.getSurveyInfo(survey.surveyInfo.surveyId)
    .subscribe(
      data => {
        if(data == undefined || data == null){
          alert("Invalid");
        }else{
          window.sessionStorage.setItem("currentSurvey", JSON.stringify(data));
          this.router.navigate(["/admin/createSurvey"]);
        }
      }
    )
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin.service'

@Component({
  selector: 'app-survey',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  surveyList: any = [];

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    this.loading = false;

    let survey: any = {
      surveyInfo: { "surveyId": "", "name": "", "description": "", "welcomeMessage": "", "exitMessage": "", "startDate": "", "endDate": "", "publicationDate": "", "expirationDate": "" },
      questionGroups: [],
      surveyIterations:[]
    };
    window.sessionStorage.setItem("currentSurvey", JSON.stringify(survey));
    this.getSurveysListForAdmin();
  }
  
  ngOnDestroy() {  
  }

  createSurvey() {
    this.router.navigate(["/admin/create-survey"]);
  }

  getSurveysListForAdmin() {
    this.loading = true;

    this.adminService.getSurveyListForAdmin()
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.surveyList = data;
            console.log("Survey List:", this.surveyList);
            this.loading = false;
          }
        })
  }

  editSurvey(survey) {
    this.adminService.getSurveyInfo(survey.surveyInfo.surveyId)
      .subscribe(
        data => {
          if (data == undefined || data == null) {
            alert('Invalid')
            return;
          } else {
            window.sessionStorage.setItem("currentSurvey", JSON.stringify(data));
            this.router.navigate(["/admin/create-survey"]);
          }
        })
  }
}

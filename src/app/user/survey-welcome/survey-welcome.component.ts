import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-survey-welcome',
  templateUrl: './survey-welcome.component.html',
  styleUrls: ['./survey-welcome.component.css']
})
export class SurveyWelcomeComponent implements OnInit {

  loading: boolean = false;
  private user: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

    ngOnInit() {
      this.loading = false;      
    }

    buttonClick(healthCheck: any) {
  
      this.router.navigate(["/user/survey"]); 
    }
}

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
 
  selectedIteration:any={"data":{"departmentalAverage":100,"companyAverage":0,"totalProgress":0}};
  iterations:any=[]
  ngOnInit() {
    this.http.get('./assets/user-survey.json').subscribe(
      data => {
        this.currentSurvey=data;
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    this.http.get('./assets/iterations.json').subscribe(
      data => {
        this.iterations=data;
        this.selectedIteration=this.iterations[0];
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
   
  } 
  loadIterationGraph(iteration){
    this.selectedIteration=iteration;
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

  lineChartSeries:any[]=[
    {
      "name": "Confidence",
      "series": [
        {
          "name": "H1",
          "value": 50
        },
        {
          "value": 80,
          "name": "H2"
        },
        {
          "value": 85,
          "name": "H3"
        },
        {
          "value": 90,
          "name": "H4"
        }
      ]
    },
    {
      "name": "Connection",
      "series": [
        {
          "name": "H1",
          "value": 60
        },
        {
          "value": 20,
          "name": "H2"
        },
        {
          "value": 45,
          "name": "H3"
        },
        {
          "value": 9,
          "name": "H4"
        }
      ]
    },
    {
      "name": "Culture",
      "series": [
        {
          "name": "H1",
          "value": 65
        },
        {
          "value": 23,
          "name": "H2"
        },
        {
          "value": 67,
          "name": "H3"
        },
        {
          "value": 15,
          "name": "H4"
        }
      ]
    }
  ]
  animations: boolean = true;
  barChart: any[] = [
    {
      "name": "H1",
      "value": 75
    },
    {
      "name": "H2",
      "value": 65
    },
    {
      "name": "H3",
      "value": 31
    },
    {
      "name": "H4",
      "value": 85
    }
  ];

  view: any[] = [345, 290];

  // options
  
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = "Iterations";
  showYAxisLabel = true;
  yAxisLabel = "%";;
  legendTitle="";
  showGridLines = true;
  yAxisLabelRight: string = '';

 comboBarScheme = {
    domain: ["#A10A28", "#A10A28", "#A10A28", "#A10A28"]
  };
  lineChartScheme = {
    domain: ["rgb(187, 187, 21)", " rgb(77, 77, 218)", "rgb(167, 106, 14)"]
  };
  yLeftAxisScale(min, max) {
    return {min: `${min}`, max: `${max}`};
  }
  yRightAxisScale(min, max) {
    return {min: `${min}`, max: `${max}`};
  }
  yLeftTickFormat(data) {
    return `${data.toLocaleString()}`;
  }
  yRightTickFormat(data) {
    return `${data}%`;
  }
  onSelect(event) {
    console.log(event);
  }
}

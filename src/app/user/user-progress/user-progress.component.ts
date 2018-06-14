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
    this.http.get('./assets/chartData.json').subscribe(
      data => {
        this.lineChartSeries=JSON.parse(JSON.stringify(data)).lineChartData;
        this.barChart=JSON.parse(JSON.stringify(data)).barChartData;
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

  lineChartSeries:any[]=[];
  animations: boolean = true;
  barChart: any[] = [];

  view: any[] = [345, 290];  
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
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
    return `${data}%`;
  }
  yRightTickFormat(data) {
    return `${data}%`;
  }
  onSelect(event) {
    console.log(event);
  }
}

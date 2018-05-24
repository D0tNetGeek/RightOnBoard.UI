import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable, Injector } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Observable } from "rxjs/Observable";

import { APP_CONFIG, IAppConfig } from './../../core/services/app.config';


@Injectable()
export class QuestionnaireService{
    questions: any[];
    seconds: number;
    timer;
    questionnaireProgress: number;


    constructor(private injector: Injector, private http: HttpClient,
        @Inject(APP_CONFIG) private appConfig: IAppConfig){}

    getQuestions(){
        const headers = new HttpHeaders({ "Content-Type": "application/json" });

        console.info("Making Questionnaire Api Call : ", `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiQuestionnairePath}`);

        return this.http.get(`${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiQuestionnairePath}`, { headers: headers})
        .pipe(
            map(( response: any) => {
                console.info("RESPONSE : ", response);
            }),
            catchError((error: HttpErrorResponse) => ErrorObservable.create(error))
        )
    }

    //public getHealthChecksForUser(userId): Observable<any> {
    public getHealthChecksForUser(userId): Observable<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiHealthCheckPath}`;
    
        //const headers = new HttpHeaders({ "Content-Type": "application/json" });
        //headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

        console.info("Get Health Check : ",url);
        //return http.get(url + `/getQuestionnaireListForUser?userId=${userId}`)
        return http.get(url + `?userId=${userId}`)//, {headers: headers})
          .map(response => {
            return response;
          })
    
      }

      public getSurveyForIteration(userId, iterationId: string): Observable<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiQuestionnairePath}/${this.appConfig.apiSurveyForIterationPath}`;
    
        return http.get(url + `/${userId}/${iterationId}`)
          .map(response => {
            return response;
          })
    
      }
      
      public submitSurvey(userId: string, surveyId: string, surveyAnswers: any[]): Observable<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}`;
        let survey = { "userId": `${userId}`, "surveyId": `${surveyId}`, "answers": surveyAnswers };
        return http.post(url + `/submitSurvey`, survey)
          .map(response => {
            return response;
          })
    
      }
}
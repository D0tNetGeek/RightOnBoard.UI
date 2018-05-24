import { Inject, Injectable, Injector } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { APP_CONFIG, IAppConfig } from "../../core/services/app.config";
import { BaseService } from "../../core/services/base.service";
import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class HealthCheckService extends BaseService {

  questions: any[];
    seconds: number;
    timer;
    questionnaireProgress: number;

  constructor(
    private injector: Injector,
      private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
    ) {
    super();
  }

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
  public getHealthChecksIterationsForUser(): Observable<any> {
    const http = this.injector.get<HttpClient>(HttpClient);
    const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiHealthCheckPath}`;

    //const headers = new HttpHeaders({ "Content-Type": "application/json" });
    //headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

    console.info("Get Health Check : ",url);
    //return http.get(url + `/getQuestionnaireListForUser?userId=${userId}`)
    return http.get(url)//, {headers: headers})
      .map(response => {
        return response;
      })
  
  }

  public getSurveyForIteration(iterationId: string): Observable<any> {
    const http = this.injector.get<HttpClient>(HttpClient);
    const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiQuestionnairePath}/${this.appConfig.apiSurveyForIterationPath}`;

    return http.get(url + `/${iterationId}`)
      .map(response => {
        return response;
      })

  }

  public getIterationListForUser(userId): Observable<any> {
    const http = this.injector.get<HttpClient>(HttpClient);
    const url = `${this.appConfig.apiEndPoint}`;

    return http.get(url + `/getIterationListForUser?userId=${userId}`)
      .map(response => {
        return response;
      })

  }

  public getSurveyForUser(userId:string, iterationId: string, surveyId: string): Observable<any> {
    const http = this.injector.get<HttpClient>(HttpClient);
    const url = `${this.appConfig.apiEndPoint}`;

    return http.get(url + `/getSurveyForUser?userId=${userId}&iterationId=${iterationId}&surveyId=${surveyId}`)
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
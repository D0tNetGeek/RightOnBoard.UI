import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable, Injector } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Observable } from "rxjs/Observable";

import { APP_CONFIG, IAppConfig } from './../../core/services/app.config';
import { BaseService } from "../../core/services/base.service";

@Injectable()
export class AdminService extends BaseService{
    
    constructor(private injector: Injector,
                private httpClient: HttpClient,
                @Inject(APP_CONFIG) private appConfig: IAppConfig){
                    
                    super();                    
                }

    public getCardHeaderData(headerType): Observable<any>{

        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}`;

        return http.get(url + `/cardHeader?headerType="${headerType}"`)
        .map(response => {
            return response;
        })
    }

    public getChartData(chartType: string, chartContentType: string): Observable<any>{
        
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}`;

        return http.get(url + `/adminChart?chartType=$(chartType)&chartConteentType=${chartContentType}`)
        .map(response => {
            return response;
        })
    }

    public getSurveyInfo(surveyId: string): Observable<any>{

        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `{this.appConfig.apiEndPont}`;

        return http.get(url + `/getSurveyForAdmin?surveyId=${surveyId}`)
        .map(response => {
            return response;
        })
    }

    public getSurveyListForAdmin(): Observable<any>{

        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiSurveyForAdminPath}/${this.appConfig.apiGetSurveysForAdminPath}`;

        console.log("GetSurveysListForAdmin :",url);

        return http.get(url)
        .map(response => {
            return response;
        });
    }

    public getCompanyInfo(): Observable<any>{

        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiCompanyPath}/${this.appConfig.apiGetCompanyInfoPath}`;        
      
        return http.get(url)
        .map(response => {
            console.info("Company Info : ", url, response);
            return response;
        });
    }

    public getDepartments(): Observable<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}`;
        return http.get(url + `/getDepartmentsForRegisteration`)
          .map(response => {
            return response;
          })
    }

    public getTimeInJob(): Observable<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}`;
        return http.get(url + `/getTimeInJobForRegisteration`)
          .map(response => {
            return response;
          })
    }
    
    public registerNewUser(user: any): Observable<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}`;
        return http.post(url + `/userRegisteration`, user)
          .map(response => {
            return response;
          })
    
    }
    
    public getUserList(): Observable<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}/${this.appConfig.apiUserServicePath}`;
        return http.get(url)
          .map(response => {
            return response;
          })
    
    }
}
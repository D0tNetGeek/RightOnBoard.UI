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

    ////////////// Chart Methods Starts Here

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

    /////////////// Chart Methods Ends Here

    ///////////// Survey Methods Starts Here

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

    public createSurvey(survey): Observable<any>{

        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiSurveyForAdminPath}/${this.appConfig.apiCreateSurveyForAdminPath}`;

        console.log("Create Survey", url);

        return http.post(url, survey)
        .map(response => {
            return response;
        });
    }

    public createIteration(iteration): Observable<any>{

        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiIterationForAdminPath}/${this.appConfig.apiCreateSurveyIterationForAdminPath}`;

        console.log("Create Iteration", url);

        return http.post(url, iteration)
        .map(response => {
            return response;
        });
    }

    public createQuestionGroups(questionGroup) : Observable<any>{

        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiQuestionGroupForAdminPath}/${this.appConfig.apiCreateQuestionGroupForAdminPath}`;

        console.log("Create QuestionGroup", url);

        return http.post(url, questionGroup)
        .map(response => {
            return response;
        });
    }

    public getQuestionGroupsForSurvey(surveyId): Observable<any>{
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiQuestionGroupForAdminPath}/${this.appConfig.apiGetQuestionGroupForSurveyPath}`;

        console.log("Load QuestionGroups for Survey", url);

        return http.get(url + `?surveyId=${surveyId}`)
        .map(response => {
            return response;
        })
    }

    public createDrivers(drivers) : Observable<any>{

        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiDriversForAdminPath}/${this.appConfig.apiCreateDriversForAdminPath}`;

        console.log("Create QuestionGroup", url);

        return http.post(url, drivers)
        .map(response => {
            return response;
        });
    }

    //////////////// Survey Methods Ends Here

    ///////////////// Company Methods Starts Here

    public createCompany(company) : Observable<any>{
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiCompanyPath}/${this.appConfig.apiCreateCompanyPath}`;

        return http.put(url, company)
        .map(response => {
            console.info("create company : ", url, response);
        })
    }
        
    public getCompaniesListForAdmin(): Observable<any>{

        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiCompanyPath}/${this.appConfig.apiGetCompaniesListForAdmin}`;

        console.log("getCompaniesListForAdmin :",url);

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

    public getCompanyInfoByCompanyId(companyId): Observable<any>{

        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiCompanyPath}/${this.appConfig.apiGetCompanyInfoByCompanyIdPath}?CompanyId=${companyId}`;        
      
        return http.get(url)
        .map(response => {
            console.info("getCompanyInfoByCompanyId : ", url, response);
            return response;
        });
    }

    public saveCompanyInfo(company): Observable<any>{
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiSurveyEndPoint}/${this.appConfig.apiCompanyPath}/${this.appConfig.apiSaveCompanyInfoPath}`;
      
        return http.post(url, company)
        .map(response => {
            console.info("saveCompanyInfo : ", url, response);
            return response;
        });
    }

    ///////// Company Methods Ends Here


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

    ///////// User Methods Starts Here //////////
    
    public registerNewUser(user): Observable<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}/${this.appConfig.apiUserServicePath}/${this.appConfig.apiCreateUserByAdminPath}`;

        console.log("registerNewUser :", url, user);

        return http.post(url, user)
          .map(response => {
            return response;
          })
    }
    
    public getUserList(): Observable<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}/${this.appConfig.apiUserServicePath}`;

        console.log("Get Users List : ",url);

        return http.get(url)
          .map(response => {
            return response;
          })
    }

    public getRolesList(): Observable<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}/${this.appConfig.apiUserServicePath}/${this.appConfig.apiGetRolesForAdminPath}`;

        console.log("Get Roles List : ",url);
        return http.get(url)
          .map(response => {
            return response;
          })
    }

    public getRegistrationOptionsList(companyId: string): Observable<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}/${this.appConfig.apiUserServicePath}/${this.appConfig.apiGetRegistrationOptionsPath}?CompanyId=${companyId}`;

        console.log("Get Registration Options List : ",url);
        return http.get(url)
          .map(response => {
            return response;
          })
    }

    //////////////// User Methods Ends Here
}
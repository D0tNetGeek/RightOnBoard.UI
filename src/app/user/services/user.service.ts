import { Inject, Injectable, Injector } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { APP_CONFIG, IAppConfig } from "../../core/services/app.config";
import { BaseService } from "../../core/services/base.service";
import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class UserService extends BaseService {

  constructor(
    private injector: Injector,
      private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
    ) {
    super();
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
}
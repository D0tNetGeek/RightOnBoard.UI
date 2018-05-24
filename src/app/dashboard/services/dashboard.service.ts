import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { HomeDetails } from '../models/home.details.interface';
import { AppConfig, IAppConfig, BaseService } from '../../core/index';

@Injectable()

export class DashboardService extends BaseService {
 
    baseUrl: string = '';

    constructor(private http: Http, private configService: IAppConfig){
        super();
        this.baseUrl = configService.apiEndPoint;
    }

    getHomeDetails(): Observable<HomeDetails> {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        let authToken = localStorage.getItem('auth_token');

        headers.append('Authorization', 'Bearer ${authToken}');

        return this.http.get(this.baseUrl + "/dashboard/home", { headers })
        .map(response => response.json())
        .catch(this.handleError);
    }
}
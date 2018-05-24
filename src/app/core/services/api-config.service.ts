import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Injector } from "@angular/core";

import { APP_CONFIG, IAppConfig } from "./app.config";

@Injectable()
export class ApiConfigService {
    
    private config: IApiConfig | null = null;

    constructor(
        private injector: Injector,
        @Inject(APP_CONFIG) private appConfig: IAppConfig) {}

    loadApiConfig(): Promise<any> {
        
        const http = this.injector.get<HttpClient>(HttpClient);
        const url = `${this.appConfig.apiEndPoint}/${this.appConfig.apiSettingsPath}`;

        return http.get<IApiConfig>(url)
            .toPromise()
            .then(config => {
                this.config = config;
                console.log("Api Config : ",this.config);
            })
            .catch(error => {
                console.error(`Failed to loadApiConfig(). Make sure ${url} is accessible.`, this.config);
                return Promise.reject(error);
            });
    }

    get configuration(): IApiConfig { 
        if(!this.config){
            throw new Error("Attempted to access configuration property before configuration data was loaded.");
        }

        return this.config;
    }
}

export interface IApiConfig {
    loginPath: string;
    logoutPath: string;
    refreshTokenPath: string;
    accessTokenObjectKey: string;
    refreshTokenObjectKey: string;
    adminRoleName: string;
}
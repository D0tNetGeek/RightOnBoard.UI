import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable} from 'rxjs/Observable';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { catchError, finalize, map } from "rxjs/operators";

import { AuthTokenType } from "./../models/auth-token-type";
import { AuthUser } from "./../models/auth-user";
import { Credentials } from "./../models/credentials";
import { ApiConfigService } from "./api-config.service";
import { APP_CONFIG, IAppConfig } from "./app.config";

import { RefreshTokenService } from "./refresh-token.service";
import { TokenStoreService } from "./token-store.service";

import { Http, Response, Headers, RequestOptions } from '@angular/http';


//import 'rxjs/add/operator/map';
//import 'rxjs/add/observable/of';

import { BaseService } from './base.service';
import { IRegistration } from '../models/register';
//import { ConfigService } from '../utils/config.service';

// Add the RxJS Observable operators we need in this app.
//import '../rxjs-operators';

@Injectable()
export class AuthenticationService extends BaseService {

    baseUrl: string = '';
    private loggedIn = false;
    private authStatusSource = new BehaviorSubject<boolean>(false);
    authStatus$ = this.authStatusSource.asObservable();
    
    constructor(
        private http: HttpClient, 
        private router: Router,
        @Inject(APP_CONFIG) private appConfig: IAppConfig, 
        private apiConfigService: ApiConfigService, 
        private tokenStoreService: TokenStoreService, 
        private refreshTokenService: RefreshTokenService, 
        //private configService: ConfigService
        ) {

        super();

        this.updateStatusOnPageRefresh();
        this.refreshTokenService.scheduleRefreshToken(this.isAuthUserLoggedIn());

        console.log("Inside Authentication service");
        //this.loggedIn = !!localStorage.getItem("auth_token");
        //this.baseUrl = configService.getApiUrl();
    }

    register(registrationModel: IRegistration): Observable<boolean>{

      console.info("Making Registration Api Call : ", `${this.appConfig.apiEndPoint}/${this.appConfig.apiRegistrationPath}`);

      return this.http
        .post(`${this.appConfig.apiEndPoint}/${this.appConfig.apiRegistrationPath}`, registrationModel)
        .pipe(
          map((response: any) => {
            return "/register";
          }
        ),
        catchError((error: HttpErrorResponse) => ErrorObservable.create(error))
      );      
    }
    
    login(credentials: Credentials): Observable<boolean> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });

        console.info("Making Login Api Call : ", `${this.appConfig.apiEndPoint}/${this.apiConfigService.configuration.loginPath}`);

        return this.http
          .post(`${this.appConfig.apiEndPoint}/${this.apiConfigService.configuration.loginPath}`, credentials, { headers: headers })
          .pipe(
            map((response: any) => {

              this.tokenStoreService.setRememberMe(credentials.rememberMe);
              
              if (!response) {
                
                console.error("There is no `{'" + this.apiConfigService.configuration.accessTokenObjectKey + "':'...','" + this.apiConfigService.configuration.refreshTokenObjectKey + "':'...value...'}` response after login.");

                this.authStatusSource.next(false);
                return false;
              }

              console.info("Response from Login Api Call : ", response);

              this.tokenStoreService.storeLoginSession(response);
              
              console.log("Logged-in user info", this.getAuthUser());
              
              this.refreshTokenService.scheduleRefreshToken(true);
              
              this.authStatusSource.next(true);
              
              console.info("User Info : ", this.getAuthUser());
              console.info("User Role : ", this.getAuthUser().roles[0]);

              //return true;

              if(this.getAuthUser().roles[0] === "admin")
              {
                return "/admin";
              }
              else if(this.getAuthUser().roles[0] === "user")
              {
                return "/user";
              }
            }),
            catchError((error: HttpErrorResponse) => ErrorObservable.create(error))
          );
    }

    getBearerAuthHeader(): HttpHeaders {
      return new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken)}`
      });
    }

    logout(navigationToHome: boolean): void {
      const headers = new HttpHeaders({ "Content-Type": "application/json" });
      const refreshToken = encodeURIComponent(this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken));

      this.http
        .get(`${this.appConfig.apiEndPoint}/${this.apiConfigService.configuration.logoutPath}?refreshToken=${refreshToken}`, { headers: headers})
        .pipe(
          map(response => response || {}),
          catchError((error: HttpErrorResponse) => ErrorObservable.create(error)),
          finalize(() => {
            this.tokenStoreService.deleteAuthTokens();
            this.refreshTokenService.unscheduleRefreshToken(true);
            this.authStatusSource.next(false);

            if(navigationToHome){
              this.router.navigate(["/"]);
            }
          }))
          .subscribe(result => {
            console.log("Logout : ", result);
          });
    }

    // logout(){
    //     localStorage.removeItem("auth_token");
    //     this.loggedIn = false;
    // }
    
    // isLoggedIn(){
    //     return this.loggedIn;
    // }

    isAuthUserLoggedIn(): boolean {
      return this.tokenStoreService.hasStoredAccessAndRefreshTokens() && !this.tokenStoreService.isAccessTokenExpired();
    }

    getAuthUser(): AuthUser | null {
      if(!this.isAuthUserLoggedIn()){
        return null;
      }

      const decodedToken = this.tokenStoreService.getDecodedAccessToken();
      const roles = this.tokenStoreService.getDecodedTokenRoles();

      return Object.freeze({
        userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        displayName: decodedToken["DisplayName"],
        roles: roles
      });
    }

    isAuthUserInRoles(requiredRoles: string[]): boolean {
      const user = this.getAuthUser();

      if(!user || !user.roles) {
        return false;
      }

      if(user.roles.indexOf(this.apiConfigService.configuration.adminRoleName.toLowerCase()) >= 0) {
        //console.info("IsUserAdmin in Role : ", user);
        return true; //The 'Admin' role has full access to every pages.
      }

      return requiredRoles.some(requiredRole => {
        if(user.roles){
          //console.info("IsUserAdmin in Roles : ",user);
          return user.roles.indexOf(requiredRole.toLowerCase()) >= 0;
        }
        else{
          return false;
        }
      });
    }

    isAuthUserInRole(requiredRole: string): boolean {
      return this.isAuthUserInRoles([requiredRole]);
    }

    private updateStatusOnPageRefresh(): void {
      this.authStatusSource.next(this.isAuthUserLoggedIn());
    }
}
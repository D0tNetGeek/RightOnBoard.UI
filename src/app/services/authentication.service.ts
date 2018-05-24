// import { Inject, Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
// import { Router } from "@angular/router";
// import { BehaviorSubject } from "rxjs/BehaviorSubject";
// import { Observable} from 'rxjs/Observable';
// import { ErrorObservable } from "rxjs/observable/ErrorObservable";
// import { catchError, finalize, map } from "rxjs/operators";

// import { AuthTokenType } from "./../models/auth-token-type";
// import { AuthUser } from "./../models/auth-user";
// import { Credentials } from "./models/credentials";
// import { ApiConfigService } from "./api-config.service";
// import { APP_CONFIG, IAppConfig } from "./../utils/config.service";

// import { RefreshTokenService } from "./refresh-token.service";
// import { TokenStoreService } from "./token-store.service";

// import { Http, Response, Headers, RequestOptions } from '@angular/http';


// //import 'rxjs/add/operator/map';
// //import 'rxjs/add/observable/of';

// import { BaseService } from './base.service';
// //import { ConfigService } from '../utils/config.service';

// // Add the RxJS Observable operators we need in this app.
// //import '../rxjs-operators';

// @Injectable()
// export class AuthenticationService extends BaseService {

//     baseUrl: string = '';
//     private loggedIn = false;
//     private authStatusSource = new BehaviorSubject<boolean>(false);
//     authStatus$ = this.authStatusSource.asObservable();
    
//     constructor(
//         private http: HttpClient, 
//         private router: Router,
//         @Inject(APP_CONFIG) private appConfig: IAppConfig, 
//         private apiConfigService: ApiConfigService, 
//         private tokenStoreService: TokenStoreService, 
//         private refreshTokenService: RefreshTokenService, 
//         //private configService: ConfigService
//         ) {

//         super();

//         this.updateStatusOnPageRefresh();
//         this.refreshTokenService.scheduleRefreshToken(this.isAuthUserLoggedIn());

//         //this.loggedIn = !!localStorage.getItem("auth_token");
//         //this.baseUrl = configService.getApiUrl();
//     }

//     // login(username: string, password: string){
        
//     //     let headers = new Headers();

//     //     headers.append('Content-Type', 'application/json');
//     //     headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
//     //     headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     //     headers.append('Access-Control-Allow-Headers','X-Requested-With,content-type');
//     //     headers.append('Access-Control-Allow-Credentials','true');
        
//     //     //let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})}; //'application/x-www-form-urlencoded'
            
//     //     // if(username === "user"){
//     //     //      return Observable.of({returnUrl: '/public/dashboard'});
//     //     //  }
//     //     //  else if(username == "admin")
//     //     //  { 
//     //     //      return Observable.of({returnUrl: '/admin'});
//     //     //  }

//     //     return this.http
//     //     .post(
//     //         this.baseUrl + '/auth/login',
//     //         JSON.stringify({ username, password }), { headers }
//     //     )
//     //     .map(
//     //         res => res.json()
//     //     )
//     //     .map(res => {
//     //         console.log(res);
//     //         localStorage.setItem('auth_token', res.access_token);
//     //         localStorage.setItem('refresh_token', res.refresh_token);
//     //         this.loggedIn = true;

//     //         return true;
//     //     })

//     //     // return this.http
//     //     //   .post(
//     //     //   this.baseUrl + '/auth/login',
//     //     //   JSON.stringify({ username, password }), { headers: headers }
//     //     //   )
//     //     //   .map((res: Response) => res.json())
//     //     //   .map(res => {
//     //     //       localStorage.setItem('auth_token', res.auth_token);
//     //     //       this.loggedIn = true;
//     //     //       return true;
//     //     //   })
//     //     //   .catch(this.handleError);
//     // }

//     login(credentials: Credentials): Observable<boolean> {
//         const headers = new HttpHeaders({ "Content-Type": "application/json" });
//         return this.http
//           .post(`${this.appConfig.apiEndPoint}/${this.apiConfigService.configuration.loginPath}`,
//             credentials, { headers: headers })
//           .pipe(
//             map((response: any) => {
//               this.tokenStoreService.setRememberMe(credentials.rememberMe);
//               if (!response) {
//                 console.error("There is no `{'" + this.apiConfigService.configuration.accessTokenObjectKey +
//                   "':'...','" + this.apiConfigService.configuration.refreshTokenObjectKey + "':'...value...'}` response after login.");
//                 this.authStatusSource.next(false);
//                 return false;
//               }
//               this.tokenStoreService.storeLoginSession(response);
//               console.log("Logged-in user info", this.getAuthUser());
//               this.refreshTokenService.scheduleRefreshToken(true);
//               this.authStatusSource.next(true);
//               return true;
//             }),
//             catchError((error: HttpErrorResponse) => ErrorObservable.create(error))
//           );
//     }

//     getBearerAuthHeader(): HttpHeaders { 
//         return new HttpHeaders({
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken)}`
//         });
//     }

//     // logout(){
//     //     localStorage.removeItem("auth_token");
//     //     this.loggedIn = false;
//     // }
    
//     isLoggedIn(){
//         return this.loggedIn;
//     }
// }
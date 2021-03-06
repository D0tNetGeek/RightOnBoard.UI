import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { catchError } from "rxjs/operators/catchError";

import { AuthTokenType } from "./../models/auth-token-type";
import { TokenStoreService } from "../services/token-store.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private delayBetweenRetriesMs = 1000;
    private numberOfRetries = 3;

    constructor(
        private tokenStoreService: TokenStoreService, 
        private router: Router) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken);

        console.log("Auth Inteceptor : Access Token : ", accessToken);

        if(accessToken){
            
            request = request.clone({
                headers: request.headers.set("Authorization", `Bearer ${accessToken}`)
            });

            console.info("Headeres in interceptor : ", request.headers);

            return next.handle(request).pipe(
                catchError(( error: any, caught: Observable<HttpEvent<any>>) => {
                    console.error({ error, caught });

                    if(error.status === 401 || error.status === 403){
                        this.router.navigate(["/accessDenied"]);
                    }

                    return ErrorObservable.create(error);
                })
            );
        }
        else
        {
            //login page
            console.log("Interceptor else : ", request);
            return next.handle(request);
        }
    }
}
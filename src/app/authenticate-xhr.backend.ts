import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';

//sweet global way to handle 401s - work in tandem with existing AuthGuard route checks
//http://stackoverflow.com/questions/34934009/handling-401s-globally-with-angular2

@Injectable()
export class AuthenticateXHRBackend extends XHRBackend {

    constructor(_browserXhr: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy){
        super(_browserXhr, _baseResponseOptions, _xsrfStrategy);
    }

    createConnection(request: Request){
        let xhrConnection = super.createConnection(request);

        xhrConnection.response = xhrConnection.response.catch((error : Response ) => {
            if((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2){

                console.log('The authentication session expired or the user is not authorised. Force refresh of the current page.');

                /*Great solution for bundling with Auth Guard !
                1. Auth Guard checks unauthorised user (e.g. looking into localStorage).
                2. On 401/403 response you clean authorised user for the Guard (e.g. removing corresponding parameters in LocalStorage).
                3. As at this early stage you cannot access the Router for forwarding to the login page,
                4. refreshing the same page will trigger the Guard checks, which will forward you to the login screen.
                */

                localStorage.removeItem('auth_token');

                window.location.href = window.location.href + '?' + new Date().getMilliseconds();
            }

            return Observable.throw(error);
        });

        return xhrConnection;
    }
}
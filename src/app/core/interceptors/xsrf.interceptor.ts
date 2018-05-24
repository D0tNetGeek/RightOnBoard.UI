import { 
    HttpEvent, 
    HttpHandler, 
    HttpInterceptor, 
    HttpRequest, 
    HttpXsrfTokenExtractor 
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor { //handles absolute URLs

    constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(request.method === "POST"){

            const headerName = "X-XSRF-TOKEN";
            
            const token = this.tokenExtractor.getToken();

            console.info("XSRF Interceptor : ", token);

            if(token && !request.headers.has(headerName)) {
                request = request.clone({
                    headers: request.headers.set(headerName, token)
                });
            }
        }

        return next.handle(request);
    }
}
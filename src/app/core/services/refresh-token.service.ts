import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { timer } from 'rxjs/observable/timer';
import { catchError, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { AuthTokenType } from './../models/auth-token-type';
import { ApiConfigService } from './api-config.service';
import { APP_CONFIG, IAppConfig } from './app.config';
import { BrowserStorageService } from './browser-storage.service';
import { TokenStoreService } from './token-store.service';
import { UtilsService } from './utils.service';

@Injectable()
export class RefreshTokenService {

    private refreshTokenTimerCheckId = "is_refreshToken_timer_started";
    private refreshTokenSubscription: Subscription | null = null;

    constructor(
        private tokenStoreService: TokenStoreService,
        @Inject(APP_CONFIG) private appConfig: IAppConfig,
        private apiConfigService: ApiConfigService,
        private http: HttpClient,
        private browserStorageService: BrowserStorageService,
        private utilsService: UtilsService
    ) {}

    scheduleRefreshToken(isAuthUserLoggedIn: boolean) {
        this.unscheduleRefreshToken(false);

        if(!isAuthUserLoggedIn){
            return;
        }

        if(this.isRefreshTokenTimerStartedInAnotherTab()) {
            return;
        }

        const expDateUtc = this.tokenStoreService.getAccessTokenExpirationDateUtc();

        if(!expDateUtc){
            throw new Error("This access token has not the 'exp' property.");
        }

        const expiresAtUtc = expDateUtc.valueOf();
        const nowUtc = new Date().valueOf();
        const threeSeconds = 3000;
        const initialDelay = Math.max(1, expiresAtUtc - nowUtc - threeSeconds);

        console.log("Intital scheduleRefreshToken Delay (ms)", initialDelay);

        const timerSource$ = timer(initialDelay);

        this.refreshTokenSubscription = timerSource$.subscribe(() => {
            this.refreshToken(isAuthUserLoggedIn);
        });

        this.setRefreshTokenTimerStarted();
    }

    unscheduleRefreshToken(cancelTimerCheckToken: boolean) {
        if(this.refreshTokenSubscription){
            this.refreshTokenSubscription.unsubscribe();
        }

        if(cancelTimerCheckToken){
            this.deleteRefreshTokenTimerCheckId();
        }
    }

    private refreshToken(isAuthUserLoggedIn: boolean){
        const headers = new HttpHeaders({ "Content-Type": "application/json" });

        const model = { refreshToken: this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken) };

        return this.http
        .post(`${this.appConfig.apiEndPoint}/${this.apiConfigService.configuration.refreshTokenPath}`, model, { headers: headers })
        .pipe(
            map(response => response || {}),
            catchError((error: HttpErrorResponse) => ErrorObservable.create(error))
        )
        .subscribe(result => {
            console.log("Refresh Token Result: ", result);

            this.tokenStoreService.storeLoginSession(result);
            this.deleteRefreshTokenTimerCheckId();
            this.scheduleRefreshToken(isAuthUserLoggedIn);
        }),
        catchError((error: HttpErrorResponse) => ErrorObservable.create(error));
    }

    private isRefreshTokenTimerStartedInAnotherTab(): boolean {
        if(!this.tokenStoreService.rememberMe()){
            return false; //It uses the session storage for the token and its access scope is limited to the current tab.
        }

        const currentTabId = this.utilsService.getCurrentTabId();
        const timerStat = this.browserStorageService.getLocal(this.refreshTokenTimerCheckId);

        console.log("RefreshTokenTimer Check",{
            refreshTokenTimerCheckId: timerStat,
            currentTabId: currentTabId
        });

        const isStarted  = timerStat && timerStat.isStarted === true && timerStat.tabId !== currentTabId;

        if(isStarted){
            console.log(`Refresh Token timer has already been started in another tab with tabId=${timerStat.tabId} . currentTablId=${currentTabId}.`);
        }

        return isStarted;
    }

    private setRefreshTokenTimerStarted(): void {
        this.browserStorageService.setLocal(this.refreshTokenTimerCheckId, {
            isStarted: true,
            tabId: this.utilsService.getCurrentTabId()
        });
    }

    private deleteRefreshTokenTimerCheckId(){
        this.browserStorageService.removeLocal(this.refreshTokenTimerCheckId);
    }
}
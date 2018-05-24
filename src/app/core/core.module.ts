import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { BaseService } from './services/base.service';
import { ApiConfigService } from './services/api-config.service';
import { APP_CONFIG, AppConfig } from './services/app.config';
import { AuthenticationService } from './services/authentication.service';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';
import { BrowserStorageService } from './services/browser-storage.service';
import { RefreshTokenService } from './services/refresh-token.service';
import { TokenStoreService } from './services/token-store.service';
import { UtilsService } from './services/utils.service';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { XsrfInterceptor } from './interceptors/xsrf.interceptor';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [
        //components that are user in app.component.ts will be listed here.
    ],
    declarations: [
        //components that are used in app.component.ts will be listed here.
    ],
    providers: [
        //global singleton services of the whole app will be listed here.
        UtilsService,
        BrowserStorageService,
        TokenStoreService,
        RefreshTokenService,
        {
            provide: APP_CONFIG,
            useValue: AppConfig
        },
        AuthenticationService, CanDeactivateGuardService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: XsrfInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        ApiConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: (config: ApiConfigService) => () => config.loadApiConfig(),
            deps: [ApiConfigService],
            multi:true
        },
    ]
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() core: CoreModule){

        if(core){
            throw new Error("CoreModule should be imported only in AppModule.");
        }
    }
}
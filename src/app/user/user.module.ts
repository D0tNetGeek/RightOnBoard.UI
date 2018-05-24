import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AuthGuard } from '../core';
import { HealthCheckService } from './services/healthcheck.service';
import { UserSurveyComponent } from './survey/survey.component';
import { HealthCheckComponent } from './health-check/health-check.component';
import { UserComponent } from './user.component';
import { SurveyWelcomeComponent } from './survey-welcome/survey-welcome.component';
import { UserService } from './services/user.service';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule
    ],
    declarations: [
        UserDashboardComponent,
        FooterComponent,
        SidebarComponent,
        TopbarComponent,
        UserComponent,
        UserSurveyComponent,
        HealthCheckComponent,
        SurveyWelcomeComponent
    ],
    providers:[
        AuthGuard,
        UserService,
        HealthCheckService
    ]
})

export class UserModule {}
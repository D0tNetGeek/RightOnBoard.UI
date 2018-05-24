import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatIconModule
} from '@angular/material';

//import { adminRoutes } from './admin.routing';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { TotalProgressComponent } from './total-progress/total-progress.component';

import { SurveyComponent } from './survey/survey.component';

import { AuthGuard } from '../core/index';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionnaireService } from './services/questionnaire.service';
import { HealthCheckComponent } from './health-check/health-check.component';
import { SurveyWelcomeComponent } from './survey-welcome/survey-welcome.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { CreateSurveyComponent } from './survey/create-survey/create-survey.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateUserComponent } from './user-management/create-user/create-user.component';

@NgModule({

  imports: [
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule
  //  adminRoutes
  ],

  declarations: [
    DashboardComponent,
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    AdminProfileComponent,
    TotalProgressComponent,
    SurveyComponent,
    QuestionnaireComponent,
    HealthCheckComponent,
    SurveyWelcomeComponent,
    SurveyListComponent,
    CreateSurveyComponent,
    UserManagementComponent,
    CreateUserComponent
  ],

  exports: [
    DashboardComponent,    
    TopbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  providers: [AuthGuard, QuestionnaireService]
})

export class AdminModule { }
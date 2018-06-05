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
  MatIconModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { TotalProgressComponent } from './total-progress/total-progress.component';

import { DashboardService } from '../dashboard/services/dashboard.service';

import { AuthGuard } from '../core/index';
import { AdminService } from './services/admin.service';
import { SurveyListComponent } from './survey/survey-list.component';
import { CreateSurveyComponent } from './survey/create-survey/create-survey.component';
import { SurveyInfoComponent } from './survey/create-survey/survey-info/survey-info.component';
import { SurveyIterationComponent } from './survey/create-survey/survey-iteration/survey-iteration.component';
import { QuestionGroupComponent } from './survey/create-survey/question-group/question-group.component';
import { QuestionDriverComponent } from './survey/create-survey/question-driver/question-driver.component';
import { QuestionComponent } from './survey/create-survey/question/question.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateUserComponent } from './user-management/create-user/create-user.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { EditCompanyComponent } from './company-management/edit-company/edit-company.component';
import { CreateCompanyComponent } from './company-management/create-company/create-company.component';
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
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
  //  adminRoutes
  ],

  declarations: [
    DashboardComponent,
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    AdminProfileComponent,
    TotalProgressComponent,
    SurveyListComponent,
    CreateSurveyComponent,
    SurveyInfoComponent,
    SurveyIterationComponent,
    QuestionGroupComponent,
    QuestionDriverComponent,
    QuestionComponent,
    UserManagementComponent,
    CreateUserComponent,
    CompanyManagementComponent,
    EditCompanyComponent,
    CreateCompanyComponent
  ],

  exports: [
    DashboardComponent,    
    TopbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  providers: [AuthGuard]
})

export class AdminModule { }
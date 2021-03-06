import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

/** Guards */
import { AuthGuard, RoleGuard, AuthGuardPermission } from './core/index';
import { } from './guards/role.guard';

/** Layout components */
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';

/** Components  */
import { LoginComponent } from './authentication/login/login.component';
import { AdminComponent } from './admin/admin.component';

import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TotalProgressComponent } from './admin/total-progress/total-progress.component';

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AccessDeniedComponent } from './authentication/access-denied/access-denied.component';

import { UserDashboardComponent } from './user/dashboard/dashboard.component';
import { UserSurveyComponent } from './user/survey/survey.component';
import { RegistrationComponent} from './registration/registration.component';

import { CreateUserComponent } from './admin/user-management/create-user/create-user.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';

import { CompanyManagementComponent } from './admin/company-management/company-management.component';
import { CreateCompanyComponent } from './admin/company-management/create-company/create-company.component';
import { EditCompanyComponent } from './admin/company-management/edit-company/edit-company.component';

import { SurveyListComponent } from './admin/survey/survey-list.component';
import { CreateSurveyComponent } from './admin/survey/create-survey/create-survey.component';
import { SurveyIterationComponent } from './admin/survey/create-survey/survey-iteration/survey-iteration.component';
import { QuestionGroupComponent } from './admin/survey/create-survey/question-group/question-group.component';
import { QuestionDriverComponent } from './admin/survey/create-survey/question-driver/question-driver.component';
import { QuestionComponent } from './admin/survey/create-survey/question/question.component';

//import { HealthCheckComponent } from './admin/health-check/health-check.component';
//import { SurveyWelcomeComponent } from './admin/survey-welcome/survey-welcome.component';

const appRoutes: Routes = [
    //No layout routes
    { path: '', component: LoginComponent },
    {
        path: 'accessDenied',
        component: AccessDeniedComponent
    },
    {
        path: '',
        component: LoginLayoutComponent,
        children: [{
            path: 'login',
            component: LoginComponent
        }]
    },
    {
        path: 'register',
        component: RegistrationComponent
    },
    {
        path: 'logout',
        component: LoginComponent
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        data: {
            permission: {
              permittedRoles: ["admin", "user"]
            } as AuthGuardPermission
          },
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/admin/dashboard',//DashboardComponent,//AdminComponent,
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                pathMatch: 'full'
            },
            {
                path: 'admin-profile',
                component: AdminProfileComponent,
                pathMatch: 'full'
            },
            {
                path: 'total-progress',
                component: TotalProgressComponent,
                pathMatch: 'full'
            },
            {
                path: 'admin-survey',
                component: SurveyListComponent,
                pathMatch: 'full'
            },
            {
                path: 'user-management',
                component: UserManagementComponent
            },
            {
                path: 'create-user',
                component: CreateUserComponent
            },
            {
                path: 'create-survey',
                component: CreateSurveyComponent,
                pathMatch: 'full'
            },
            {
                path: 'survey-iteration',
                component: SurveyIterationComponent,
                pathMatch: 'full'
            },
            {
                path: 'question-group',
                component: QuestionGroupComponent,
                pathMatch: 'full'
            },
            {
                path: 'question-driver',
                component: QuestionDriverComponent,
                pathMatch: 'full'
            },
            {
                path: 'question',
                component: QuestionComponent,
                pathMatch: 'full'
            },
            {
                path: 'company-management',
                component: CompanyManagementComponent
            },
            {
                path: 'create-company',
                component: CreateCompanyComponent
            },
            {
                path: 'edit-company',
                component: EditCompanyComponent
            }
        ]
    },
    {
        path: 'user',
        canActivate: [AuthGuard],
        data: {
            permission: {
              permittedRoles: ["admin", "user"]
            } as AuthGuardPermission
          },
        loadChildren: 'app/user/user.module#UserModule'
    },

    //Otherwise redirect to home
    //{ path: '**', redirectTo: '/login', pathMatch: 'full'}
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true }) //, { useHash: true } { enableTracing: true }
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
//export const routing = RouterModule.forRoot(appRoutes);
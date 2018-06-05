import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { SurveyListComponent } from './survey/survey-list.component';
import { CreateSurveyComponent } from './survey/create-survey/create-survey.component';

import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateUserComponent } from './user-management/create-user/create-user.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { EditCompanyComponent } from './company-management/edit-company/edit-company.component';

export const adminRoutes: ModuleWithProviders = RouterModule.forChild([
{
    path: 'admin',
    component: AdminComponent, 

    children: [
        { path: '', component: DashboardComponent },
        { path: 'admin-profile', component: AdminProfileComponent },
        { path: 'admin-survey', component: SurveyListComponent },
        { path: 'create-survey', component: CreateSurveyComponent },
        { path: 'user-management', component: UserManagementComponent },
        { path: 'create-user', component: CreateUserComponent },
        { path: 'company-management', component: CompanyManagementComponent }
      
        // { path: 'dashboard', component: DashboardComponent },
        // { path: 'topbar', component: TopbarComponent},
        // { path: 'sidebar', component: SidebarComponent},
        // { path: 'footer', component: FooterComponent}
  ]
}]);
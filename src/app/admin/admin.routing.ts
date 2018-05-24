import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { SidebarComponent } from './sidebar/sidebar.component';
// import { TopbarComponent } from './topbar/topbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { FooterComponent } from './footer/footer.component';

import { AdminComponent } from './admin.component';

import { AdminProfileComponent } from './admin-profile/admin-profile.component';

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
      
        // { path: 'dashboard', component: DashboardComponent },
        // { path: 'topbar', component: TopbarComponent},
        // { path: 'sidebar', component: SidebarComponent},
        // { path: 'footer', component: FooterComponent}
  ]
}]);
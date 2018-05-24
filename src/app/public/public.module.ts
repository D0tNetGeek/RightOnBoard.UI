import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import {
//   MatButtonModule,
//   MatInputModule,
//   MatRippleModule,
//   MatTooltipModule,
//   MatIconModule
// } from '@angular/material';

//import { adminRoutes } from './admin.routing';

//import { DashboardComponent } from './dashboard/dashboard.component';
//import { TopbarComponent } from './topbar/topbar.component';
//import { SidebarComponent } from './sidebar/sidebar.component';
//import { FooterComponent } from './footer/footer.component';
//import { AdminProfileComponent } from './admin-profile/admin-profile.component';
//import { TotalProgressComponent } from './total-progress/total-progress.component';

import { AuthGuard } from '../core/index';
//import { SurveyComponent } from './survey/survey.component';

@NgModule({

  imports: [
    // BrowserAnimationsModule,
    // FormsModule,
    // CommonModule,
    // RouterModule,
    // MatButtonModule,
    // MatRippleModule,
    // MatInputModule,
    // MatTooltipModule,
    // MatIconModule
  //  adminRoutes
  ],

  declarations: [
    //DashboardComponent,
    //TopbarComponent,
    //SidebarComponent,
    //FooterComponent,
    //AdminProfileComponent,
    //TotalProgressComponent
    //SurveyComponent
  ],

  exports: [
    //DashboardComponent,    
    //TopbarComponent,
    //SidebarComponent,
    //FooterComponent
  ],
  providers: [AuthGuard]
})

export class PublicModule { }
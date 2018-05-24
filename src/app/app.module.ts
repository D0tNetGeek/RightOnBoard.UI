import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, XHRBackend } from '@angular/http';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { AuthenticationModule } from './authentication/authentication.module';
import { CoreModule } from './core/core.module';

/** Admin Module */
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';

/**  Layout components  */
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';

import{
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';

// import { UserComponent } from './user/user.component';
// import { UserDashboardComponent } from './user/dashboard/dashboard.component';
// import { FooterComponent } from './user/footer/footer.component';
// import { HealthCheckComponent } from './user/health-check/health-check.component';
// import { SidebarComponent } from './user/sidebar/sidebar.component';
// import { UserSurveyComponent } from './user/survey/survey.component';
// import { TopbarComponent } from './user/topbar/topbar.component';

@NgModule({
  imports: [
    BrowserModule,  
    //FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AdminModule,    
    HttpModule,
    AuthenticationModule,
    CoreModule,
    ModalModule.forRoot(),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    AdminLayoutComponent,
    AdminComponent,
    PageNotFoundComponent,
    RegistrationComponent,
    //UserComponent,
    //UserDashboardComponent,
    //FooterComponent,
    //HealthCheckComponent,
    //SidebarComponent,
    //UserSurveyComponent,
    //TopbarComponent
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

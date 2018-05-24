import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';

import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
//import { ChangePasswordService } from './change-password/change-password.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule
  ],
  declarations: [LoginComponent, AccessDeniedComponent, ChangePasswordComponent],
  //providers: [ChangePasswordService]
})
export class AuthenticationModule { }

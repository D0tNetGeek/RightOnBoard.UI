import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Data,
    Route,
    Router,
    RouterStateSnapshot,
} from "@angular/router";

import { AuthGuardPermission } from '../models/auth-guard-permission';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    private permissionObjectKey = "permission";

    constructor(private authService: AuthenticationService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        // if(localStorage.getItem('auth_token')){
        //     //logged in so return true
        //      return true;
        // }
        const permissionData = route.data[this.permissionObjectKey] as AuthGuardPermission;
        const returnUrl = state.url;

        //return this.hasAuthUserAccessToThisRoute(permissionData, returnUrl);

        // console.log("AUTH GUARD :",this.auth.isLoggedIn());

        // if(!this.auth.isLoggedIn()){
        //     console.log("AUTH GUARD - Not Logged In :",this.auth.isLoggedIn());
        //     //not logged in so redirect to login page with the return url
        //     this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        //     return false;
        // }

        //return true;
        return this.hasAuthUserAccessToThisRoute(permissionData, returnUrl);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const permissionData = childRoute.data[this.permissionObjectKey] as AuthGuardPermission;
        const returnUrl = state.url;
        return true;
      }
    
      canLoad(route: Route): boolean {
        if (route.data) {
          const permissionData = route.data[this.permissionObjectKey] as AuthGuardPermission;
          const returnUrl = `/${route.path}`;
          return true;
        } else {
          return true;
        }
      }

    private hasAuthUserAccessToThisRoute(permissionData: Data, returnUrl: string): boolean {
       /* if(!this.authService.isAuthUserLoggedIn()) {
            this.showAccessDenied(returnUrl);

            return false;
        }

        if(!permissionData){
            return true;
        }

        if(Array.isArray(permissionData.deniedRoles) && Array.isArray(permissionData.permittedRoles)) {
            throw new Error("Don't set both 'deniedRoled' and 'permittedRoles' in route data.")
        }

        if(Array.isArray(permissionData.permittedRoles)){
            const isInRole = this.authService.isAuthUserInRoles(permissionData.permittedRoles);

            if(isInRole){
                return true;
            }

            this.showAccessDenied(returnUrl);

            return false;
        }

        if(Array.isArray(permissionData.deniedRoles)){
            const isInRole = this.authService.isAuthUserInRoles(permissionData.deniedRoles);

            if(!isInRole) {
                return true;
            }

            this.showAccessDenied(returnUrl);

            return false;
        }
        */
        return true;
    }

    private showAccessDenied(returnUrl: string){
        console.error("ACCESS DENIED");
        this.router.navigate(["/accessDenied"], {queryParams: { returnUrl: returnUrl}});
    };
}
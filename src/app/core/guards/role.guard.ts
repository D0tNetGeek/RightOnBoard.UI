import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RoleGuard implements CanActivateChild {
    constructor(private router: Router) {}

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //const userRoles: string[] = this.authService.getRoles(); //--> get the current user's roles.
        const routeRoles: string[] = route.data['roles'];

        console.log("ROLES : ", routeRoles);
        /*
            Now you can do your logic to determine if the user has the appropriate role.
            If they do return true
            Else user router to set a redirect route to /user url or whatever you feel like and return false.
        */

        return true;
    }
}
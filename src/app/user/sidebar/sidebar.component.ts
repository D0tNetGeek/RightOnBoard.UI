import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: './dashboard', title: 'Dashboard', icon: 'dashboard', class: ' ' },
    { path: './user-health-check', title: 'My HealthChecks', icon: 'trending_up', class: '' },
    { path: './user-progress', title: 'Your Progress',  icon:'trending_up', class: '' },
    { path: './user-profile', title: 'User Profile',  icon:'person', class: '' },    
    { path: './survey', title: 'Survey',  icon:'timeline', class: '' },
    { path: '/logout', title: 'Logout', icon:'exit_to_app', class: ''}
  /*  { path: '../userSurvey', title: 'Survey', icon: 'library_books', class: '' },*/
   ];

@Component({
    selector: 'app-user-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    menuItems: any[];
    selectedMenu: string = "";
    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);

       this.setActiveClass(null)
    }
    setActiveClass(menuItem:any){
        for(let temp of this.menuItems){
            if(menuItem==null && temp.title=='Dashboard'){
                //temp.class+=" active ";
            }
            else if(temp==menuItem){
                temp.class+=" active ";
            }else{
                temp.class.replace(/ active /g,"");
            }
        }
    }

    isMobileMenu() {

        if ($(window).width() > 991) {

            return false;

        }

        return true;

    };

}
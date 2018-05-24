import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '../dashboard', title: 'Admin Dashboard', icon: 'dashboard', class: ' ' },
    { path: '../total-progress', title: 'Total Progress', icon: 'trending_up', class: '' },
    { path: '../admin-survey', title: 'Survey', icon: 'library_books', class: '' },
    { path: '../admin-profile', title: 'Admin Profile', icon: 'person', class: '' },
    { path: '../user-management', title: 'User Management', icon: 'person', class: '' }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    menuItems: any[];
    selectedMenu: string = "";
    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        /*if (localStorage.getItem("adminSelectedMenu") == null || localStorage.getItem("adminSelectedMenu") == undefined) {
            localStorage.setItem("adminSelectedMenu", "dashboard");
        }
        this.selectedMenu = localStorage.getItem("adminSelectedMenu"))
        */
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
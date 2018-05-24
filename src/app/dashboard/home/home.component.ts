import { Component, OnInit } from '@angular/core';

import { HomeDetails } from '../models/home.details.interface';
import { DashboardService } from '../services/dashboard.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit{
    homeDetails: HomeDetails;

    constructor(private dashBoardService: DashboardService){}

    ngOnInit(){

        this.dashBoardService.getHomeDetails()
        .subscribe((homeDetails: HomeDetails) => {
            this.homeDetails = this.homeDetails;
        },
        error => {

        });
    }
}
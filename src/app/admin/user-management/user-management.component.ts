import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin.service'

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  departments = [];
  timeForJobs = [];
  userList: any = [];

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminService) { }
  
  ngOnInit() {
    this.loading = false;

    //this.loadDepartments();
    //this.loadTimeForJobs();
    this.getUserList();
  }
  
  ngOnDestroy() {
    
  }

  getUserList() {
    this.loading = true;

    this.adminService.getUserList()
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.userList = data;
            this.loading = false;
          }
        })
  }

  loadDepartments() {
    this.adminService.getDepartments()
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.departments = data;
          }
        })
  }

  getDepartmentName(deptId){
    for(let dept of this.departments){
      if(dept.value==deptId){return dept.label};
    }
    return "";
  }

  getTimeInJobLabel(timeId){
    for(let time of this.timeForJobs){
      if(time.value==timeId)return time.label;
    }
    return "";
  }
  
  loadTimeForJobs() {
    this.adminService.getTimeInJob()
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.timeForJobs = data;
          }
        })
  }

  createUser(){
    this.router.navigate(["/admin/create-user"]);
  }

}

import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { UsersService } from 'src/app/services/users.service';
import { CapsulesService } from 'src/app/services/capsules.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardData = {
    capsules: 0,
    users: 0,
    faculty: 0,
    reviewer: 0,
  }

  constructor(private usersService: UsersService, private capsulesService: CapsulesService) { }
  ngOnInit() {
    this.getDashboardData();
  }

  getDashboardData(): void {
    this.capsulesService.getAll().subscribe(
      response => {
        this.dashboardData.capsules = response.length
      }
    )

    this.usersService.getAll().subscribe(
      response => {
        this.dashboardData.users = response.length
      }
    )

    this.usersService.getAllFaculty().subscribe(
      response => {
        this.dashboardData.faculty = response.length
      }
    )

    this.usersService.getAllReviewer().subscribe(
      response => {
        this.dashboardData.reviewer = response.length
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  facultyArray: Array<Object>
  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllFaculty().subscribe(
      response => {
        this.facultyArray = response;
      },
      error => {

      }
    )
  }

  verifyFacultyAccount(id: String): void {
    this.usersService.update(id, { is_verified: true }).subscribe(
      response => {
        console.log(response)
        window.location.reload();
      },
      error => {

      }
    )
  }

  assignAsReviewer(id: String): void {
    this.usersService.update(id, { user_type: 'reviewer' }).subscribe(
      response => {
        console.log(response)
      },
      error => {

      }
    )
  }
  removeAsReviewer(id: String): void {
    this.usersService.update(id, { user_type: 'faculty' }).subscribe(
      response => {
        console.log(response)
      },
      error => {

      }
    )
  }

}

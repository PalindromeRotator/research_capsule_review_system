import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  facultyArray: Array<Object>
  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAll().subscribe(
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
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Successfully verified account!',
        }).then((result) => {
          this.usersService.getAll().subscribe(
            response => {
              this.facultyArray = response;
            },
            error => {

            }
          )
        })

      },
      error => {

      }
    )
  }

  assignAsReviewer(id: String): void {
    this.usersService.update(id, { user_type: 'reviewer' }).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Successfully assigned faculty as reviewer',
        }).then((result) => {
          this.usersService.getAll().subscribe(
            response => {
              this.facultyArray = response;
            },
            error => {

            }
          )
        })
      },
      error => {

      }
    )
  }
  removeAsReviewer(id: String): void {
    this.usersService.update(id, { user_type: 'faculty' }).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Successfully removed reviewer',
        }).then((result) => {
          this.usersService.getAll().subscribe(
            response => {
              this.facultyArray = response;
            },
            error => {

            }
          )
        })
      },
      error => {

      }
    )
  }

}

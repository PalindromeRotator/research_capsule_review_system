import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userData = {
    email: '',
    name: ''
  }

  constructor(private router: Router, private usersService: UsersService) { }


  ngOnInit() {
    this.getUserData(localStorage.getItem('uid'))
    console.log(localStorage.getItem('uid'))
  }

  getUserData(id: String): void {
    this.usersService.getById(id).subscribe(
      response => {
        this.userData.email = response.email
        this.userData.name = response.name
        console.log(response)
      },
      error => {

      }
    )
  }

  editCurrentDataUser(): void {
    this.usersService.update(localStorage.getItem('uid'), this.userData).subscribe(
      response => {
        console.log(response)
        alert('Successfully updated')
      },
      error => {
        console.log(error)
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  constructor(private router: Router, private usersService: UsersService) { }


  registerUser(): void {
    const data = {
      email: this.userData.email,
      name: this.userData.name,
      password: this.userData.password,
      confirmPassword: this.userData.password,
      user_type: 'faculty',
      is_verified: false,
    };
    if (data.email !== '' && data.password !== '' && data.confirmPassword !== '' && data.name !== '') {
      this.usersService.create(data)
        .subscribe(
          response => {
            this.router.navigate(['']);
          },
          error => {
            console.log(error)
            // if (error.status == 404)
            //   Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Username or Password is Incorrect.'
            //   })
          });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Forms cannot be empty'
      })
    }

  }
  ngOnInit() {
  }

}

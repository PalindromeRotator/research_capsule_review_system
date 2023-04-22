import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location, private element: ElementRef, private router: Router) {
    this.location = location;
  }

  name = localStorage.getItem('name')
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  logoutSession(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: 'You are trying to log out your account. Are you sure?',
      showCancelButton: true,
      confirmButtonText: "OK",
      denyButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('name');
        localStorage.removeItem('uid',)
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('user_type')
        this.router.navigate(['/'])
      } else {

      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-primary', class: '' },
  { path: '/research', title: 'Research Capsules', icon: 'ni-books text-primary', class: '' },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '' },
  // { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '' },
  // { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];
export const ROUTES_ADMIN: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-primary', class: '' },
  { path: '/accounts', title: 'Accounts List', icon: 'ni-circle-08 text-primary', class: '' },
  { path: '/research', title: 'Research Capsules', icon: 'ni-books text-primary', class: '' },
  { path: '/report', title: 'Report', icon: 'ni-single-copy-04 text-blue', class: '' },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user_type') !== 'admin') {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    else {
      this.menuItems = ROUTES_ADMIN.filter(menuItem => menuItem);
    }

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logoutSession(): void {
    localStorage.clear();
    this.router.navigate(['/'])
  }
}

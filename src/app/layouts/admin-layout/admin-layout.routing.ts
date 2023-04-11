import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AccountsComponent } from 'src/app/pages/accounts/accounts.component';
import { ResearchComponent } from 'src/app/pages/research/research.component';
import { ReportComponent } from 'src/app/pages/report/report.component';
import { ViewCapsuleComponent } from 'src/app/pages/research/view-capsule/view-capsule.component';
import { AddCapsuleComponent } from 'src/app/pages/research/add-capsule/add-capsule.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'accounts', component: AccountsComponent },
    { path: 'research', component: ResearchComponent },
    { path: 'report', component: ReportComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'research/view-capsule/:capsuleData', component: ViewCapsuleComponent },
    { path: 'research/add-capsule', component: AddCapsuleComponent }
];

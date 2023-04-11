import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ResearchComponent } from './pages/research/research.component';
import { ReportComponent } from './pages/report/report.component';
import { ViewCapsuleComponent } from './pages/research/view-capsule/view-capsule.component';
import { AddCapsuleComponent } from './pages/research/add-capsule/add-capsule.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccountsComponent,
    ResearchComponent,
    ReportComponent,
    ViewCapsuleComponent,
    AddCapsuleComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

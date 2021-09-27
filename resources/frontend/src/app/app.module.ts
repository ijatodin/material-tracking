import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { MaterialRegistryComponent } from './material-registry/material-registry.component';
import { LocationManagementComponent } from './setting/location-management/location-management.component';
import { SupplierManagementComponent } from './setting/supplier-management/supplier-management.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReceivingComponent } from './receiving/receiving/receiving.component';
import { ReceivingFormComponent } from './receiving/receiving-form/receiving-form.component';
import { PersonnelManagementComponent } from './setting/personnel-management/personnel-management.component';
import { CustomAdapter, CustomDateParserFormatter } from './receiving/receiving-form/dateFormatter';
import { SummaryReportComponent } from './receiving/summary-report/summary-report.component';
import { ProjectManagementComponent } from './setting/project-management/project-management.component';
import { SanctumInterceptor } from './helpers/sanctum.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HomeComponent,
    MaterialRegistryComponent,
    LocationManagementComponent,
    SupplierManagementComponent,
    LoginComponent,
    RegisterComponent,
    ReceivingComponent,
    ReceivingFormComponent,
    PersonnelManagementComponent,
    SummaryReportComponent,
    ProjectManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    { provide: HTTP_INTERCEPTORS, useClass: SanctumInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { MaterialRegistryComponent } from './material-registry/material-registry.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ReceivingFormComponent } from './receiving/receiving-form/receiving-form.component';
import { ReceivingComponent } from './receiving/receiving/receiving.component';
import { SummaryReportComponent } from './receiving/summary-report/summary-report.component';
import { LocationManagementComponent } from './setting/location-management/location-management.component';
import { PersonnelManagementComponent } from './setting/personnel-management/personnel-management.component';
import { ProjectManagementComponent } from './setting/project-management/project-management.component';
import { SupplierManagementComponent } from './setting/supplier-management/supplier-management.component';
import { TypeManagementComponent } from './setting/type-management/type-management.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'summary-slip',
    component: SummaryReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'receiving',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ReceivingComponent },
      { path: ':action', component: ReceivingFormComponent },
      { path: ':action/:ref_no', component: ReceivingFormComponent },
    ],
  },
  { path: 'test', component: TestComponent },
  {
    path: 'material-registry',
    component: MaterialRegistryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'purchase-order',
    component: PurchaseOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setting',
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'location-management',
      //   component: LocationManagementComponent
      // },
      {
        path: 'supplier-management',
        component: SupplierManagementComponent,
      },
      {
        path: 'personnel-management',
        component: PersonnelManagementComponent,
      },
      {
        path: 'project-management',
        component: ProjectManagementComponent,
      },
      {
        path: 'type-management',
        component: TypeManagementComponent,
      },
    ],
  },
];

const routerConfig: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

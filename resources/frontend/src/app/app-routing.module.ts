import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { MaterialRegistryComponent } from './material-registry/material-registry.component';
import { ReceivingFormComponent } from './receiving/receiving-form/receiving-form.component';
import { ReceivingComponent } from './receiving/receiving/receiving.component';
import { LocationManagementComponent } from './setting/location-management/location-management.component';
import { SupplierManagementComponent } from './setting/supplier-management/supplier-management.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'receiving', children: [
    { path: '', component: ReceivingComponent},
    { path: 'create', component: ReceivingFormComponent}
  ] },
  { path: 'test', component: TestComponent },
  { path: 'material-registry', component: MaterialRegistryComponent },
  { path: 'setting', children: [
    {
      path: 'location-management',
      component: LocationManagementComponent
    },
    {
      path: 'supplier-management',
      component: SupplierManagementComponent
    },
  ] }
];

const routerConfig: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}

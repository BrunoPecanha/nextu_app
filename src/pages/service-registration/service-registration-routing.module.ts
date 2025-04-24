import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceRegistrationPage } from './service-registration.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRegistrationPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleRegistrationPage } from './role-registration.page';

const routes: Routes = [
  {
    path: '',
    component: RoleRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRegistrationPageRoutingModule {}

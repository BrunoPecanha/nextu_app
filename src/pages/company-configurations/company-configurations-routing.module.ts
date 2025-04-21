import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyConfigurationsPage } from './company-configurations.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyConfigurationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyConfigurationsPageRoutingModule {}

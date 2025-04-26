import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociatedProfessionalPage } from './associated-professional.page';


const routes: Routes = [
  {
    path: '',
    component: AssociatedProfessionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssociatedProfessionalPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionsPage } from './promotions.page';


const routes: Routes = [
  {
    path: '',
    component: PromotionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotionsPageRoutingModule {}

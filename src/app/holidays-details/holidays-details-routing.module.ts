import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HolidaysDetailsPage } from './holidays-details.page';

const routes: Routes = [
  {
    path: '',
    component: HolidaysDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolidaysDetailsPageRoutingModule {}

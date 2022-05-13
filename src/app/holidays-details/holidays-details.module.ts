import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HolidaysDetailsPageRoutingModule } from './holidays-details-routing.module';

import { HolidaysDetailsPage } from './holidays-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HolidaysDetailsPageRoutingModule
  ],
  declarations: [HolidaysDetailsPage]
})
export class HolidaysDetailsPageModule {}

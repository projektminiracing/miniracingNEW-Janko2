import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareerPage } from './career';

@NgModule({
  declarations: [
    CareerPage,
  ],
  imports: [
    IonicPageModule.forChild(CareerPage),
  ],
})
export class CareerPageModule {}

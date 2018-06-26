import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RacePage } from './race';

@NgModule({
  declarations: [
    RacePage,
  ],
  imports: [
    IonicPageModule.forChild(RacePage),
  ],
})
export class RacePageModule {}

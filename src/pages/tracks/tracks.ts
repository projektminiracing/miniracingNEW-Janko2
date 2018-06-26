import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RaceServiceProvider } from '../../providers/race-service/race-service';

import { ModalController } from 'ionic-angular';

/**
 * Generated class for the TracksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracks',
  templateUrl: 'tracks.html',
})
export class TracksPage {

  selectedTrack : any;

  results : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public raceServiceProvider : RaceServiceProvider, public modalController: ModalController) {
    this.raceServiceProvider.getTracks().then(data => {
      this.results = data;
      //console.log(JSON.stringify(this.results));
    })
  }

  openModal(track_id : string) {
    this.raceServiceProvider.getTrack(track_id).then(data => {
      this.selectedTrack = data;
      console.log(JSON.stringify(this.selectedTrack));
      var modalPage = this.modalController.create('TrackPage',this.selectedTrack);
      modalPage.present();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TracksPage');
  }
}

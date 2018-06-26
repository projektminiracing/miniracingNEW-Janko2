import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ViewController } from 'ionic-angular';

/**
 * Generated class for the TrackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-track',
  templateUrl: 'track.html',
})
export class TrackPage {

  show : boolean;
  selectedTrack : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController : ViewController) {
    this.show = false;
  }

  public closeModal(){
    this.viewController.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackPage');
    this.selectedTrack = this.navParams;
    this.show = true;
    console.log("MODAL");
    console.log(this.selectedTrack);
  }

}

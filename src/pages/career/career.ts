import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RaceServiceProvider } from '../../providers/race-service/race-service';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CareerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-career',
  templateUrl: 'career.html',
})
export class CareerPage {
  driver : any;
  vehicle : any;

  tmpDriver : any;
  tmpVehicle : any;

  shownGroup = null;

  upgradesLeft : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public raceServiceProvider : RaceServiceProvider, private alertController: AlertController) {
    this.getVehicle();
    this.getDriver();
    this.upgradesLeft = parseInt(localStorage.getItem("skillPoints"));
    console.log(this.upgradesLeft);
  }

  getVehicle(){
    this.raceServiceProvider.getVehicle(JSON.parse(localStorage.getItem("currentUser"))._id).then(data => {
      this.vehicle = data[0];
      console.log("VEHICLE");
      console.log(this.vehicle);
    })
  }

  getDriver(){
    this.raceServiceProvider.getDriver(JSON.parse(localStorage.getItem("currentUser"))._id).then(data => {
      this.driver = data[0];
      console.log("DRIVER");
      console.log(this.driver);
    })
  }
  
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };

  upgrade(choice: string, attribute: string, value: number) {
    if(this.upgradesLeft != 0){
      if(choice == "driver"){
        console.log("voznik", attribute, value);
        this.driver[attribute] += value;
        console.log(this.driver);
        
        this.upgradesLeft--;
        localStorage.setItem("skillPoints", this.upgradesLeft.toString());
        this.tmpDriver = this.driver;
        this.raceServiceProvider.upgradeDriver(this.tmpDriver).then(data => {
          this.tmpDriver = data;
          console.log(this.tmpDriver);
        })
        this.driver = this.tmpDriver;
      }
      if(choice == "vehicle"){
        console.log("vozilo", attribute, value);
        if(attribute == "engineBC")
          this.vehicle["engine"]["batteryConsumption"] += value;
        else if(attribute == "engineHS")
          this.vehicle["engine"]["horsePower"] += value;
        else
          this.vehicle[attribute] += value; //spremeni pravilno

        this.upgradesLeft--;
        localStorage.setItem("skillPoints", this.upgradesLeft.toString());
        this.tmpVehicle = this.vehicle;
        this.raceServiceProvider.upgradeVehicle(this.tmpVehicle).then(data => {
          this.tmpVehicle = data;
          console.log("ZNOTRAJ SERVICA");
          console.log(this.tmpVehicle);
        })
        this.vehicle = this.tmpVehicle;
      }
    }
    else{
      this.alert();
    }
  }

  isRecommended(attribute: string){
    var attr = localStorage.getItem("recommendedUpgrade");
    var attr2 = attr.split('|');
    if(attr2.indexOf(attribute) !== -1) {
      return false;
    }
    return true; 
  }

  alert(){
    if(this.upgradesLeft == 0){
      let alert = this.alertController.create({
        title: 'No points left!',
        subTitle: 'Head over to the race tab and join a race to gain more upgrade points.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareerPage');
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RaceServiceProvider } from '../../providers/race-service/race-service';

import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the RacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-race',
  templateUrl: 'race.html',
})
export class RacePage {

  results : any;
  tracks : any;
  selectedTrack : any;
  section_result : any; //prikaz trenutnega sectiona - idji se pretvorijo v imena
  user_driver_index : number;
  summed_results: any;
  user_driver_index_summed: number;

  display_results : boolean;
  display_finalTimes : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public raceServiceProvider : RaceServiceProvider, public loadingController: LoadingController) {
    this.display_results = false;
    this.display_finalTimes = false;
    this.raceServiceProvider.getTracks().then(data => {
      this.tracks = data;
    })
  }

  SimulateRace(){
    this.raceServiceProvider.SimulateRace(this.selectedTrack,JSON.parse(localStorage.getItem("currentUser"))._id).then(data => {  
      this.results = data;
      this.summed_results = new Array(5);
      this.summed_results[0] = new Array(this.results["sections"][0][0].length);
      this.summed_results[1] = new Array(this.results["sections"][0][1].length);
      this.summed_results[2] = new Array(this.results["sections"][0][1].length);
      this.summed_results[3] = new Array(this.results["sections"][0][1].length);
      this.summed_results[4] = new Array(this.results["sections"][0][1].length);
      for(var i = 0; i < this.summed_results[0].length; i++) this.summed_results[0][i] = 0.0;
      for(i = 0; i < this.summed_results[1].length; i++) this.summed_results[1][i] = this.results["sections"][0][1][i];
      for(i = 0; i < this.summed_results[2].length; i++) this.summed_results[2][i] = this.DriverIDtoName(this.summed_results[1][i]);
      for(i = 0; i < this.summed_results[3].length; i++) this.summed_results[3][i] = 0;

      this.CalculateSkillPointsFromRace();
      this.ProcessRaceResults();
    })
  }

  RecommendUpgrade(){
    localStorage.removeItem("recommendedUpgrade");
    localStorage.setItem("recommendedUpgrade", "");
    var speed = 0;
    var overtaking = 0;
    var blocking = 0;
    var reaction_time = 0;
    var concentration = 0;
    var patience = 0;
    var aggresiveness = 0;
    var intelligence = 0;
    for(var i = 0; i < 5; i++){
      if(this.results["drivers"][i]["overall"] > this.results["drivers"][this.user_driver_index]["overall"]){

        if(this.results["drivers"][i]["speed"] > this.results["drivers"][this.user_driver_index]["speed"] && speed < 1){
          localStorage.setItem("recommendedUpgrade", localStorage.getItem("recommendedUpgrade") + "|speed");
          speed++;
        }
        if(this.results["drivers"][i]["overtaking"] > this.results["drivers"][this.user_driver_index]["overtaking"] && overtaking < 1){
          localStorage.setItem("recommendedUpgrade", localStorage.getItem("recommendedUpgrade") + "|overtaking");
          overtaking++;
        }
        if(this.results["drivers"][i]["blocking"] > this.results["drivers"][this.user_driver_index]["blocking"] && blocking <1){
          localStorage.setItem("recommendedUpgrade", localStorage.getItem("recommendedUpgrade") + "|blocking");
          blocking++;
        }
        if(this.results["drivers"][i]["reaction_time"] > this.results["drivers"][this.user_driver_index]["reaction_time"] && reaction_time <1){
          localStorage.setItem("recommendedUpgrade", localStorage.getItem("recommendedUpgrade") + "|reaction_time");
          reaction_time++;
        }
        if(this.results["drivers"][i]["concentration"] > this.results["drivers"][this.user_driver_index]["concentration"] && concentration <1){
          localStorage.setItem("recommendedUpgrade", localStorage.getItem("recommendedUpgrade") + "|concentration");
          concentration++;
        }
        if(this.results["drivers"][i]["patience"] > this.results["drivers"][this.user_driver_index]["patience"] && patience <1){
          localStorage.setItem("recommendedUpgrade", localStorage.getItem("recommendedUpgrade") + "|patience");
          patience++;
        }
        if(this.results["drivers"][i]["aggresiveness"] > this.results["drivers"][this.user_driver_index]["aggresiveness"] && aggresiveness <1){
          localStorage.setItem("recommendedUpgrade", localStorage.getItem("recommendedUpgrade") + "|aggresiveness");
          aggresiveness++;
        }
        if(this.results["drivers"][i]["intelligence"] > this.results["drivers"][this.user_driver_index]["intelligence"] && intelligence <1){
          localStorage.setItem("recommendedUpgrade", localStorage.getItem("recommendedUpgrade") + "|intelligence");
          intelligence++;
        }
      }
    }
    console.log(localStorage.getItem("recommendedUpgrade"));
  }

  AddSectionToSum(section: any){
    for(var i = 0; i < this.summed_results[4].length; i++) this.summed_results[4][i] = i;

    for(var j = 0; j < section[1].length; j++){
      for(i = 0; i < this.summed_results[0].length; i++){
        if(this.summed_results[1][i] == section[1][j]){
          this.summed_results[0][i] += section[0][j];    
        }
      }
    }
    console.log(this.summed_results);
    var swapped;
    do {
        swapped = false;
        for (i=0; i < this.summed_results[0].length-1; i++) {
            if (this.summed_results[0][i] > this.summed_results[0][i+1]) {
                var temp = this.summed_results[0][i];
                this.summed_results[0][i] = this.summed_results[0][i+1];
                this.summed_results[0][i+1] = temp;
                temp = this.summed_results[1][i];
                this.summed_results[1][i] = this.summed_results[1][i+1];
                this.summed_results[1][i+1] = temp;
                temp = this.summed_results[2][i];
                this.summed_results[2][i] = this.summed_results[2][i+1];
                this.summed_results[2][i+1] = temp;
                temp = this.summed_results[3][i];
                this.summed_results[4][i] = this.summed_results[3][i+1];
                this.summed_results[4][i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    for(j = 0; j < this.summed_results[4].length; j++){
      this.summed_results[3][j] = j - this.summed_results[4][j];
    }
    console.log("_---------------------------_");
  }

  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async ProcessRaceResults(){
    for(var i = 0; i < this.results["sections"].length; i++){  //skozi vsak section
      await this.sleep(3000);
      this.AddSectionToSum(this.results["sections"][i]);
      this.ProcessSectionResults(this.results["sections"][i]);
      this.user_driver_index_summed = this.FindUserDriverSummedPosition();
      this.display_results = true;
    }
    this.display_finalTimes = true;
    console.log(this.summed_results);
    this.RecommendUpgrade();
    console.log(this.display_finalTimes);
  }

  DriverIDtoName(find_id: string){ //nadje tudi pozicijo user driverja
    for(var i = 0; i < 5; i++){
      if(this.results["drivers"][i]["_id"] == find_id){
        return this.results["drivers"][i]["name"];
      }
    } 
  }

  FindUserDriverSummedPosition(){
    var user_driver_id;
    for(var j = 0; j < this.results["drivers"].length; j++){
      if(this.results["drivers"][j]["user_id"] ==JSON.parse(localStorage.getItem("currentUser"))._id){
        user_driver_id = this.results["drivers"][j]["_id"];
      }
    }
    for(var i = 0; i < this.summed_results[1].length; i++){
        if(this.summed_results[1][i] == user_driver_id){
          return i;
        }
    }
  }

  FindUserDriverSectionPosition(section: any){
    for(var i = 0; i < 5; i++){
      for(var j = 0; j < 5; j++){
        if(this.results["drivers"][j]["_id"] == section[i]){
          if(this.results["drivers"][j]["user_id"] == JSON.parse(localStorage.getItem("currentUser"))._id){
            return i;
          }
        }
      }
    }
  }

  ProcessSectionResults(section: any){
    this.user_driver_index = this.FindUserDriverSectionPosition(section[1]);
    for(var i = 0; i < section[1].length; i++){
      section[1][i] = this.DriverIDtoName(section[1][i]); //spremeni ID-je v driverje za izpis
    }
    this.section_result = section; //nov izpis
  }

  CalculateSkillPointsFromRace(){
    var skillPoints = parseInt(localStorage.getItem("skillPoints"));
    for(var i = 0; i < 5; i++){
      if(this.results["drivers"][i]["user_id"] == JSON.parse(localStorage.getItem("currentUser"))._id){
        skillPoints = Math.abs(i - 5);
        localStorage.setItem("skillPoints", skillPoints.toString());
      }
    }
    //console.log(localStorage.getItem("skillPoints"));
  }

  loadingFunction() {
    let loading = this.loadingController.create({
      content: 'Driving through section...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RacePage');
  }
}
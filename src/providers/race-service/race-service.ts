import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RegisterServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RaceServiceProvider {

  apiUrl = 'http://10.0.2.2:8000';
  constructor(public http: HttpClient) {
    console.log('Hello RaceServiceProvider Provider');
  }

  SimulateRace(track_id : string, user_id : string){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/race/simulate/' + track_id + '/' + user_id).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    })
  }

  getTracks(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/track').subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    })
  }

  getTrack(track_id : string){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/track/' + track_id).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    })
  }

  getDriver(user_id : string){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/driver/user_id/'+user_id).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    })
  }

  getVehicle(user_id : string){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/vehicle/user_id/'+user_id).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    })
  }

  upgradeDriver(driver : any){
    return new Promise(resolve=>{
      this.http.post(this.apiUrl+"/driver/upgrade", driver).subscribe(data =>{
        console.log(data);
        resolve(data);
      }), error => {
        console.log(error);
      }
    })
  }

  upgradeVehicle(vehicle : any){
    return new Promise(resolve=>{
      this.http.post(this.apiUrl+"/vehicle/upgrade", vehicle).subscribe(data =>{
        console.log(data);
        resolve(data);
      }), error => {
        console.log(error);
      }
    })
  }

}
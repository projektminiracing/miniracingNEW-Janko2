import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user_profile: any;
  
  user = { username: '', password: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, public registerServiceProvider: RegisterServiceProvider) {
    this.user_profile = { username: '', email: '', password: '', firstname: '', lastname: '', birthday: ''};
  }

  tryLogin(){
    this.registerServiceProvider.tryLogin(this.user).then(data => {
      this.user_profile = data;
      console.log(JSON.stringify(this.user_profile));
    })
  }

  isLoggedIn(){
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    else{
      return false;  
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}

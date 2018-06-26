import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RegisterServiceProvider } from '../../providers/register-service/register-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  users: any;
  user = { body: {username: '', email: '', password: '', firstname: '', lastname: '', birthday: ''}};
  constructor(public navCtrl: NavController, public navParams: NavParams, public registerServiceProvider: RegisterServiceProvider) {
    this.getUsers();
  }

  getUsers(){
    this.registerServiceProvider.getUsers().then(data => {
      this.users = data;
      console.log(this.users);
    })
  }

  saveUser() {
    this.registerServiceProvider.saveUser(this.user).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}

import { Component } from '@angular/core';

import { RegisterPage } from '../register/register';
import { RacePage } from '../race/race';
import { LoginPage } from '../login/login';
import { TracksPage } from '../tracks/tracks';
import { ProfilePage } from '../profile/profile';
import { CareerPage } from '../career/career';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  loginTab = LoginPage;
  registerTab = RegisterPage;
  tracksTab = TracksPage;
  raceTab = RacePage;
  profileTab = ProfilePage;
  careerTab = CareerPage;

  constructor() {

  }

  isLoggedIn(){
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    else{
      return false;  
    }
  }
}

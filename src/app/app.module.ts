import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { RegisterPage } from '../pages/register/register';
import { RacePage } from '../pages/race/race';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { TracksPage } from '../pages/tracks/tracks';
import { ProfilePage } from '../pages/profile/profile';
import { CareerPage } from '../pages/career/career';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { RegisterServiceProvider } from '../providers/register-service/register-service';
import { RaceServiceProvider } from '../providers/race-service/race-service';


@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    RacePage,
    LoginPage,
    TabsPage,
    TracksPage,
    ProfilePage,
    CareerPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    RacePage,
    LoginPage,
    TabsPage,
    TracksPage,
    ProfilePage,
    CareerPage,
  ],
  providers: [
    StatusBar,
    Camera,
    SocialSharing,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterServiceProvider,
    RaceServiceProvider
  ]
})
export class AppModule {}

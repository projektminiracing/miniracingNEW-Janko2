import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FabContainer } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user_profile: any;
  photoHost='http://localhost:8000/';
  fileToUpload: File = null;
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public registerServiceProvider: RegisterServiceProvider, private socialSharing: SocialSharing, private camera: Camera) {
    this.user_profile = JSON.parse(localStorage.getItem("currentUser"));
  }

  share(socialNet: string, fab: FabContainer) {
    fab.close();
    console.log("Sharing in", socialNet);

    var msg  = "miniracing Ionic application is awesome! Go check it out!";
    if(socialNet == "twitter"){
      this.socialSharing.shareViaTwitter(msg, null, null);
    }
    else if(socialNet == "facebook"){
      this.socialSharing.shareViaFacebook(msg, null, null);
    }
    else if(socialNet == "email"){
      this.socialSharing.shareViaEmail(msg,"Miniracing",['lolek.boleq@gmail.com']).then(() =>{

      }).catch(() => {

      })
    }
    else if(socialNet == "sms");
  }

  updateUser(){
    console.log(JSON.stringify(this.user_profile));
    this.registerServiceProvider.updateUser(this.user_profile).then(data => {
      this.user_profile = data;
    })
  }

  handleFileInput(files: FileList){
    this.fileToUpload = files.item(0);
  }

  updateProfilePicture(){
    if(this.fileToUpload != null){
      this.registerServiceProvider.updateProfilePicture(this.fileToUpload,this.user_profile._id).then(data =>{
        this.user_profile = data;
      })
    }
  }
  
  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        this.fileToUpload = imageData;
  		}, (err) => {
			 console.log(err);
		});	
  }

  logout(){ 
    localStorage.removeItem("currentUser");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
}
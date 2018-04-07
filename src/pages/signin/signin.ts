import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

import { RoomPage } from '../room/room';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  data = { nickname: "" };
  // displayName photoURL

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public auth: AuthServiceProvider) { }

  ionViewDidLoad() {
    var audio = new Audio('https://ia801302.us.archive.org/21/items/THEMEOFSCOTLANDSCOTLANDFOREVERSCOTLANDREMIX/THEME_OF_SCOTLAND___SCOTLAND_FOREVER_SCOTLAND_REMIX.mp3');
    audio.play();
  }

  async signin() {
    this.auth.googleLogin().then((data) => {
      let user = data.user;
      console.log(user);
      this.navCtrl.setRoot(RoomPage, {
        user: {
          displayName: user.displayName,
          photoURL: user.photoURL
        }
      });
    }).catch(err => {
      console.error(err);
    });
  }

  enterNickname() {
  
    this.navCtrl.setRoot(RoomPage, {
      nickname: this.data.nickname
    });
  }
}

import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { User } from '@firebase/auth-types';

@Injectable()
export class AuthServiceProvider {

  constructor(public platform: Platform,
    public gplus: GooglePlus,
    public afAuth: AngularFireAuth) {
  }

  private async nativeGoogleLogin(): Promise<any> {
    try {

      const gplusUser = await this.gplus.login({
        'webClientId': '671847211545-fen6vlh670vetc9ofgupm41tfm0g42e8.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      return this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));

    } catch (err) {
      console.log(err)
    }
  }

  private async webGoogleLogin(): Promise<any> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      return this.afAuth.auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err)
    }
  }

  googleLogin(): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.nativeGoogleLogin();
    } else {
      return this.webGoogleLogin();
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  getUser() {
    return this.afAuth.auth.currentUser;
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(auth => !auth ? false : true);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from 'firebase';
import { SigninPage } from '../signin/signin';

/**
 * Generated class for the AccountInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-info',
  templateUrl: 'account-info.html',
})
export class AccountInfoPage {
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  async signout() {
    this.auth.signOut().then(() => {
      this.navCtrl.setRoot(SigninPage);
    })
  }

}

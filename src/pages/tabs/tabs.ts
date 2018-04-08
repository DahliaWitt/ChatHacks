import { Component } from '@angular/core';

import { RoomPage } from '../room/room';
import { AddRoomPage } from '../add-room/add-room';
import { SigninPage } from '../signin/signin';
import { AccountInfoPage } from '../account-info/account-info';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RoomPage;
  tab2Root = AddRoomPage;
  tab3Root = AccountInfoPage;

  constructor(public navCtrl: NavController) {
    //this.navCtrl.setRoot(TabsPage);
    console.log(this.navCtrl.parent);
  }
}

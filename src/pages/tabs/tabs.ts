import { Component } from '@angular/core';

import { RoomPage } from '../room/room';
import { AddRoomPage } from '../add-room/add-room';
import { SigninPage } from '../signin/signin';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RoomPage;
  tab2Root = AddRoomPage;
  tab3Root = SigninPage;

  constructor() {

  }
}

import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { RoomPage } from '../room/room';
import { SigninPage } from '../signin/signin';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RoomPage;
  tab3Root = SigninPage;

  constructor() {

  }
}


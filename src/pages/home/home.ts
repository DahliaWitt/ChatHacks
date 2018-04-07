import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { RoomPage } from '../room/room';
import * as firebase from 'Firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  data = { type: '', nickname: '', message: '' };
  chats = [];
  roomkey: string;
  nickname: string;
  offStatus: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;
    
    var joinMessages = new Array(" has joined the room.", " is here, RUN.", " has joined your party.", " is the new God.", " just joined. Hide your bananas.", ". Stay awhile and listen.", " appeared.", " just landed.", " just showed up, Take a shot.", " is public enemy number one.");
    
    let joinData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    joinData.set({
      type: 'join',
      user: this.nickname,
      message: this.nickname + joinMessages[ Math.floor(Math.random() * joinMessages.length)],
      sendDate: Date()
    });
    this.data.message = '';

    firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  sendMessage() {
    //Make Easter Egg Arrays here
      var messageCheck = new Array();
      var respondArrat = new Array();


    //Grab the properties of the chatroom
    let newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    let userMessage = this.data.message;
    if (userMessage) {
      if (userMessage.length >= 1000) {
        this.showToast("bottom", "Please keep your message under 1000 characters");
      } else {

        

        newData.set({
              type: this.data.type,
              user: this.data.nickname,
              message: this.data.message,
              sendDate: Date()
            });
        //Clear Message
        this.data.message = '';
      }
    } else {
      this.showToast("bottom", "Your message is empty!");
    }
  }

  exitChat() {
    let exitData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    exitData.set({
      type: 'exit',
      user: this.nickname,
      message: this.nickname + ' has exited this room.',
      sendDate: Date()
    });

    this.offStatus = true;

    this.navCtrl.setRoot(RoomPage, {
      nickname: this.nickname
    });
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
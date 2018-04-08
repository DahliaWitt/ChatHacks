import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import * as firebase from 'Firebase';

@IonicPage()
@Component({
  selector: 'page-add-room',
  templateUrl: 'add-room.html',
})
export class AddRoomPage {
  data = { roomname: '' };
  ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
  }

    showToast(position: string, message: string) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: position
      });
      toast.present(toast);
    }



  addRoom() {
    if(this.data.roomname.length > 0){
      let newData = this.ref.push();
      newData.set({
        roomname: this.data.roomname
      });
      this.navCtrl.pop();
    }else{
      this.showToast("bottom", "You need to enter a name first.");
    }
  }

}

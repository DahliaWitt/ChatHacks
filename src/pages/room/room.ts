import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import * as firebase from 'Firebase';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LocationServicesProvider } from '../../providers/location-services/location-services';

@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  rooms = [];
  ref = firebase.database().ref('chatrooms/');
  user;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthServiceProvider,
    public locationServices: LocationServicesProvider,
    public toast: ToastController) {
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
  }

  ionViewDidLoad() {
    let fbUser = this.auth.getUser();
    this.user = {
      displayName: fbUser.displayName,
      photoURL: fbUser.photoURL
    }
    console.log(this.user);
  }

  getLocation() {
    console.log('start')
    this.locationServices.getLocation().then((data) => {
      console.log('tehn');
      let toast = this.toast.create({
        message: 'location sent to NSA: ' + data.coords.latitude + " " + data.coords.longitude,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }).catch(err => {
      console.error(err);
    });
  }

  addRoom() {
    this.navCtrl.push(AddRoomPage);
  }

  joinRoom(room) {
    this.navCtrl.setRoot(HomePage, {
      key: room.key,
      roomname: room.roomname,
      user: this.user
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

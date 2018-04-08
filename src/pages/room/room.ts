import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import * as firebase from 'Firebase';
import * as GeoFire from 'geofire';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LocationServicesProvider } from '../../providers/location-services/location-services';

@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  rooms = [];
  ref = firebase.database().ref('chatrooms/');
  geoRef = firebase.database().ref('geo/')
  geoFire = new GeoFire(this.geoRef);
  user;
  loading = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthServiceProvider,
    public locationServices: LocationServicesProvider,
    public toast: ToastController) {
  }

  ionViewDidLoad() {
    let fbUser = this.auth.getUser();
    this.user = {
      displayName: fbUser.displayName,
      photoURL: fbUser.photoURL
    }
  }

  getLocation() {
    this.loading = true;
    this.locationServices.getLocation().then((data) => {
      var geoQuery = this.geoFire.query({
        center: [data.coords.latitude, data.coords.longitude],
        radius: 0.1 // 0.1 km or 100 meters
      });
      geoQuery.on("key_entered", (key, location, distance) => {
        console.log(key + " entered query at " + location + " (" + distance + " km from center)");
        this.ref.child(key)
          .once('value')
          .then((snapshot) => {
            var value = snapshot.val();
            this.rooms = this.rooms.concat(snapshotToArray([snapshot]));
            this.loading = false;
          })
      });

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

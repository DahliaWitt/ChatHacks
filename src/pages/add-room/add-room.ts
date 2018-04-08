import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import * as GeoFire from 'geofire';
import { LocationServicesProvider } from '../../providers/location-services/location-services';


@IonicPage()
@Component({
  selector: 'page-add-room',
  templateUrl: 'add-room.html',
})
export class AddRoomPage {
  data = { roomname: '' };
  dataRef = firebase.database().ref('chatrooms/');
  geoRef = firebase.database().ref('geo/');
  loading = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public locationServices: LocationServicesProvider) {
  }

  ionViewDidLoad() { }

  addRoom() {
    this.loading = true;
    let newData = this.dataRef.push();
    newData.set({
      roomname: this.data.roomname
    });
    this.locationServices.getLocation().then((data) => {
      let geoFire = new GeoFire(this.geoRef);
      let geoRef = geoFire.ref;
      geoFire.set(newData.key, [data.coords.latitude, data.coords.longitude]).then(() => {
        this.navCtrl.pop();
        this.loading = false;
      }).catch(function (err) {
        console.error(err);
        this.loading = false;
      });
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });

  }

}

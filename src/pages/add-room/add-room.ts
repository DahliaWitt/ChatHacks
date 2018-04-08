import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import * as firebase from 'Firebase';
import * as GeoFire from 'geofire';
import { LocationServicesProvider } from '../../providers/location-services/location-services';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


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
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public locationServices: LocationServicesProvider, public auth: AuthServiceProvider) {
    this.auth.getUser().subscribe((fbUser) => {
      this.user = fbUser;
    });
  }

  ionViewDidLoad() { }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

  addRoom() {
    if (this.data.roomname.length > 0) {
      this.loading = true;
      let newData = this.dataRef.push();
      let date = new Date();
      date.setHours(date.getHours() + 32);
      newData.set({
        roomname: this.data.roomname,
        expire: date.toLocaleDateString(),
        user: this.user.uid
      });
      console.log('add room');
      this.locationServices.getLocation().then((data) => {
        console.log('locationServices');
        let geoFire = new GeoFire(this.geoRef);
        let geoRef = geoFire.ref;
        geoFire.set(newData.key, [data.coords.latitude, data.coords.longitude]).then(() => {
          this.navCtrl.parent.select(0);
          this.loading = false;
          this.data.roomname = '';
        }).catch(function (err) {
          console.error(err);
          this.loading = false;
        });
      }).catch(err => {
        console.error(err);
        this.loading = false;
      });
    } else {
      this.showToast("bottom", "You need to enter a name first.");
    }


  }

}

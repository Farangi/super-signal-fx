import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotoSignup() {
    this.navCtrl.push("SignupPage");
  }

  gotoLogin() {
    this.navCtrl.push("LoginPage");
  }

}

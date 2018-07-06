import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';

import { AlertService } from "../_services";

//import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LandingPage';

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private alertService: AlertService) {
      
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: 'HomePage' }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ngOnInit (){
    this.alertService.getMessage().subscribe( message => {
      if(message){

        if(message.type == 'error'){
          let alert = this.alertCtrl.create({
            title: 'Error',
            message: message.text,
            buttons: [ 'Dismiss' ]
          });
          alert.present();
        } 

        else if(message.type == 'success'){
          let alert = this.alertCtrl.create({
            title: 'Success',
            message: message.text,
            buttons: [ 'OK' ]
          });
          alert.present();
        }
      }
    }); 
  }

}

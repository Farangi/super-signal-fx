
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController, ToastController } from 'ionic-angular';

import { AlertService } from "../_services";
import { FcmService } from '../_services';
import { AuthService } from '../_services';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('rootNav') navCtrl: NavController;

  rootPage: any = '';

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private fcm: FcmService,
    private alertService: AlertService
    ) {
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private initializeNotification(userId){
    console.log('Notifications');
    this.platform.ready().then(() => {
      //this.fcm.subscribeToTopic('all');
      this.fcm.getToken(userId);

      this.fcm.listenToNotifications().subscribe(data => {
        if(data.wasTapped){
          console.log('a tap');
          console.log(JSON.stringify(data));
          this.navCtrl.setRoot('SignalPage', JSON.parse(data.signalData));
        }
        else {
          console.log('b tap');
          console.log(JSON.stringify(data));
          const toast = this.toastCtrl.create({
            message: data.title,
            duration: 3000,
            showCloseButton: true,
            closeButtonText: "Show"
          });
          toast.onDidDismiss((data, role) => {
            if (role == "close") {
              this.navCtrl.push('SignalPage', JSON.parse(data.signalData));
            }
          });
          toast.present();
        }
      });

    });
  }

  ngOnInit (){

    const userObj = this.authService.currentUserObservable.subscribe(user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        userObj.unsubscribe();
      } else {
        this.initializeNotification(user.uid);
        this.rootPage = 'SidemenuPage';
        userObj.unsubscribe();
      }
    });
    /* const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = HomePage;
        unsubscribe();
      }
    }); */

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

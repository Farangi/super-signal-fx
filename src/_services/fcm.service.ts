import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class FcmService {

  constructor(
    public fcm: FCM,
    public afs: AngularFirestore,
    private platform: Platform
  ) {}

  subscribeToTopic(topic){
    this.fcm.subscribeToTopic(topic);
  }

  // Get permission from the user
  async getToken(id) {

    //let token;

    if(this.platform.is('android') || this.platform.is('ios')){
        this.fcm.getToken().then(token => {
            console.log(token +' + '+ id);
            return this.saveTokenToFirestore(id, token)
        }, 
        (error) => {
            console.log(error);
        });
    }
    else{
        return;
    }
  
    /* if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    } 
  
    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    } 
    
    return this.saveTokenToFirestore(token) */
  }

  // Save the token to firestore
  private saveTokenToFirestore(id, token) {
    if (!token) return;
  
    const devicesRef = this.afs.collection('devices')
  
    const docData = { 
      token: token
    }
  
    return devicesRef.doc(id).set(docData)
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.fcm.onNotification();
  }

}
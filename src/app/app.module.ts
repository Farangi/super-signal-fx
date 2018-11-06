import { AngularFireDatabase } from 'angularfire2/database';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SelectSearchableModule } from 'ionic-select-searchable';

import { FCM } from '@ionic-native/fcm';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './app.config';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Clipboard } from '@ionic-native/clipboard';

import { AlertService } from "../_services";
import { FcmService } from '../_services';
import { AuthService } from '../_services';
import { UserService } from '../_services';
import { SignalService } from '../_services';
import { SymbolService } from '../_services';
import { FaqsService } from '../_services';
import { DisclaimerService } from '../_services';
import { ContactService } from '../_services';
import { PaymentProvider } from '../providers/payment/payment';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    SelectSearchableModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Clipboard,
    FCM,
    AngularFireAuth,
    AngularFireDatabase,
    AlertService,
    FcmService,
    AuthService,
    UserService,
    SignalService,
    SymbolService,
    FaqsService,
    DisclaimerService,
    ContactService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PaymentProvider
  ]
})
export class AppModule {}

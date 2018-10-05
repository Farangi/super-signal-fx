import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { SignalService } from './../../_services';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  private loader: any;
  signals: any = [];

  constructor(
    private app: App,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private signalService:SignalService
    ) {
  }

  ngOnInit(){
    this.getSignals();
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
 
    this.loader.present();
  }

  trackSignals(index, signal) {
    return signal ? signal.id : undefined;
  }

  getSignals( refresher = null ){
    if(refresher === null){
      this.presentLoading('Loading...');
    }

    this.signalService.getActiveAndPendingSignals().subscribe(signals => {
      //console.log(signals);
      if(refresher){
        refresher.complete();
      }
      else {
        this.loader.dismiss();
      }
      this.signals = signals;
    });
  }

  refreshSignals(refresher){
      this.getSignals(refresher);
  }

  showSignalDetails(signal){
    this.app.getRootNav().push("SignalPage", signal);
  }

  addSignal(){
    this.signalService.addData();
  }

}

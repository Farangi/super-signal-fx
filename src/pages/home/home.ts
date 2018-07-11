import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  signals: any = [];
  id: any = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {
  }

  ngOnInit(){
    this.getSignals();
  }

  trackSignals(index, signal) {
    return signal ? signal.id : undefined;
  }

  getSignals(){
    this.signals.push({id:this.id++, asset:'EURUSD', direction:'Buy limit', status:'pending'});
    this.signals.push({id:this.id++, asset:'USDJPY', direction:'Sell by market', status:'active'});
  }

  refreshSignals(refresher){
    setTimeout(() => {
      this.getSignals();
      refresher.complete();
    }, 4000);
  }

}

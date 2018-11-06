import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { SignalService } from './../../_services';
import { SymbolService } from './../../_services';

import * as moment from 'moment';
import { PaymentProvider } from '../../providers/payment/payment';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage implements OnInit {

  private loader: any;

  showDateFilter: boolean = false;
  type: any ='all';

  results: any = [];
  symbols: any = [];

  symbolFilter: any = '';
  dateFilter: any = {from:'', to:''};

  currentDate: String = new Date().toISOString();

  constructor(
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private signalService:SignalService,
    private symbolService:SymbolService,
    private paymentService: PaymentProvider
    ) {
  }

  ngOnInit(){
    this.getResults();
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });

    this.loader.present();
  }

  addDateFilter() {
    this.showDateFilter = true;
    this.dateFilter.from = moment(moment().subtract(30, 'days')).startOf('day').format();
    this.dateFilter.to = moment().endOf('day').format();
  }

  trackResult(index, result) {
    return result ? result.id : undefined;
  }

  getSymbols(refresher){
    if(this.symbols.length == 0){
      this.symbolService.getAllSymbols().subscribe(symbols => {
        console.log(symbols);
        this.symbols = symbols;
        this.symbols.push({name:'NONE', value:'NONE'});
        this.symbolFilter = this.symbols[this.symbols.length-1];
      });
    }
    if(refresher === null){
      this.loader.dismiss();
    }
  }

  getResults( refresher = null ){
    if(refresher === null){
      this.presentLoading('Loading...');
    }

    this.signalService.getAllSignals().subscribe(signals => {
      console.log(signals);

      if(refresher){
        refresher.complete();
      }

      this.paymentService.checkMembership().subscribe((pro:any) => {
        if(pro && pro.status == 'active'){
          console.log('Active hai janab');
          this.results = signals;
        } else {
          console.log('Ni hai janab');
          this.results = signals.filter(signal => !signal.premium);
        }
      });

      this.getSymbols(refresher);
    });
  }

  refreshResults(refresher){
    this.getResults(refresher);
  }

  showSignalDetails(result){
    this.app.getRootNav().push("SignalPage", result);
  }

}

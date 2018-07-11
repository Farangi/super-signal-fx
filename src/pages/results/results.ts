import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage implements OnInit {

  //momentObj: moment.Moment = moment("someDate");

  id: any = 0;

  showDateFilter: boolean = false;
  type: any ='all';
  results: any = [];
  pairs: any = [];
  pairFilter: any = '';
  dateFilter: any = {from:'', to:''};

  currentDate: String = new Date().toISOString();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {
  }

  ngOnInit(){
    this.getResults();
    this.getPairs();

    this.pairs.push({name:'NONE', value:'NONE'});
    this.pairFilter = this.pairs[this.pairs.length-1];
  }

  addDateFilter() {
    this.showDateFilter = true;
    //this.dateFilter.from = moment().subtract(30, 'days').format();
    this.dateFilter.from = moment(moment().subtract(30, 'days')).startOf('day').format();
    this.dateFilter.to = moment().endOf('day').format();
  }

  trackResult(index, result) {
    return result ? result.id : undefined;
  }

  getPairs(){
    this.pairs.push({name:'EURUSD', value:'EURUSD'});
    this.pairs.push({name:'USDJPY', value:'USDJPY'});
    this.pairs.push({name:'NZDUSD', value:'NZDUSD'});
    this.pairs.push({name:'GBPCAD', value:'GBPCAD'});
    this.pairs.push({name:'EURAUD', value:'EURAUD'});
    this.pairs.push({name:'USDCAD', value:'USDCAD'});
  }

  getResults(){
    this.results.push({id:this.id++, asset:'EURUSD', date:'2018-07-01T20:27:14Z', direction:'Buy limit', status:'pending', pips:105});
    this.results.push({id:this.id++, asset:'USDJPY', date:'2018-07-02T20:27:14Z', direction:'Sell by market', status:'active', pips:-150});
    this.results.push({id:this.id++, asset:'EURUSD', date:'2018-07-02T20:27:14Z', direction:'Buy limit', status:'closed', pips:105});
    this.results.push({id:this.id++, asset:'NZDUSD', date:'2018-07-03T20:27:14Z', direction:'Sell by market', status:'closed', pips:-150});
    this.results.push({id:this.id++, asset:'GBPCAD', date:'2018-07-04T20:27:14Z', direction:'Sell by market', status:'closed', pips:270});
    this.results.push({id:this.id++, asset:'USDJPY', date:'2018-07-05T20:27:14Z', direction:'Sell by market', status:'closed', pips:-180});
    this.results.push({id:this.id++, asset:'EURAUD', date:'2018-07-05T20:27:14Z', direction:'Sell by market', status:'closed', pips:330});
    this.results.push({id:this.id++, asset:'USDCAD', date:'2018-07-05T20:27:14Z', direction:'Sell by market', status:'cancelled', pips:0});
    this.results.push({id:this.id++, asset:'USDCAD', date:'2018-07-05T20:27:14Z', direction:'Sell by market', status:'cancelled', pips:0});
  }

  refreshResults(refresher){
    setTimeout(() => {
      this.getResults();
      refresher.complete();
    }, 4000);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homeRoot = "HomePage";
  resultsRoot = "ResultsPage";
  accountRoot = "AccountPage";

  index: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {
      this.index = navParams.data.tabIndex || 0;
  }

}

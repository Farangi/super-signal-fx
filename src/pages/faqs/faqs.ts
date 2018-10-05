import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FaqsService } from './../../_services';

@IonicPage()
@Component({
  selector: 'page-faqs',
  templateUrl: 'faqs.html',
})
export class FaqsPage implements OnInit {

  private loader: any;
  faqs: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private faqsService:FaqsService
    ) {
  }

  ngOnInit(){
    this.getFaqs();
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
 
    this.loader.present();
  }

  getFaqs(){
    this.presentLoading('Loading...');

    this.faqsService.getAllFaqs().subscribe(faqs => {
      //console.log(faqs);
      this.faqs = faqs;
      this.loader.dismiss();
    });
  }

}

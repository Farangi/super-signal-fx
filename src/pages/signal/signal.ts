import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Clipboard } from '@ionic-native/clipboard';

import { DisclaimerService } from './../../_services';

@IonicPage()
@Component({
  selector: 'page-signal',
  templateUrl: 'signal.html',
})
export class SignalPage implements OnInit  {

  private loader: any;
  signal: any = {};
  disclaimer: any = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private clipboard: Clipboard,
    private disclaimerService:DisclaimerService
    ) {
  }

  ngOnInit(){
    this.getSignal();
    this.getDisclaimer();
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
 
    this.loader.present();
  }

  getSignal(){
    this.signal = this.navParams.data;
    //{disclaimer:'Trading foreign exchange on margin carries a high level of risk, and may not be suitable for all investors. Past performance is not indicative of future results. The high degree of leverage can work against you as well as for you. Before deciding to invest in foreign exchange you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose. You should be aware of all the risks associated with foreign exchange trading, and seek advice from an independent financial advisor if you have any doubts.'};
  }

  getDisclaimer(){
    this.presentLoading('Loading...');
    
    this.disclaimerService.getDisclaimer().subscribe(disclaimer => {
      console.log(disclaimer);
      this.disclaimer = disclaimer;
      this.loader.dismiss();
    });
  }

  coptTextToClipboard(text) {
    this.clipboard.copy(text).then(
      (resolve: string) => {
        console.log(resolve);
        this.presentToast('Copied to clipboard successfully');
       },
       (reject: string) => {
        console.log(reject);
        this.presentToast('Error occured try again')
       }
     );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    /* toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    }); */
  
    toast.present();
  }

}

import { PaymentProvider } from './../../providers/payment/payment';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var StripeCheckout:any;

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage implements OnInit {

  handler: any;
  initSubs: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private paymentService: PaymentProvider) {
      // this.paymentService.membership.subscribe(pro => {
      //   console.log(pro);
      // }, err => console.log(err));
  }

  ngOnInit() {
    this.configHandler();
    this.paymentService.checkMembership().subscribe(sub => {
      if(!sub) {
        this.initSubs = true;
      } else {
        this.initSubs = false;
      }
    }, err => console.log(err));
  }

  private configHandler() {
    this.handler = StripeCheckout.configure({
      key: 'pk_test_d8e36fMMIxKlKpuGvWpEzBER',
      image: 'https://goo.gl/EJJYq8',
      locale: 'auto',
      token: token => {
        this.paymentService.processPayment(token);
      }
    });
  }

  openHandler() {
    this.handler.open({
      name: 'Super Signal Fx',
      description: 'Monthly Pro Membership',
      amount: 2999
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

}

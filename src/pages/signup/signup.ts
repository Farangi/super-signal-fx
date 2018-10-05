import { AuthService } from './../../_services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from "../../_services";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private loader: any;
  authForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertService: AlertService,
    private auth:AuthService
  ) {
    this.authForm = formBuilder.group({ 
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],       
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/), Validators.minLength(8), Validators.maxLength(100)])],
      termsAndServices: [false]
    });
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
 
    this.loader.present();
  }

  submitForm(value: any) {console.log(value);
    if(this.authForm.valid) {
      if(value.termsAndServices){
        this.presentLoading('Signing Up...');
        let credentials = {
          email: value.email,
          password: value.password,
          displayName: value.name
        };
        this.auth.signUp(credentials).then(
          () => {
            this.navCtrl.setRoot("SidemenuPage");
            this.loader.dismiss();
          },
          error => {
            this.alertService.error(error);
            this.loader.dismiss();
          }
        );
      }
      else {
        this.alertService.error('You must agree to the terms of service before continuing.')
      }
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  seePrivacyPolicy(){
    this.alertService.success('Under Construction');
  }

}

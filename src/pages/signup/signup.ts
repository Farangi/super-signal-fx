import { AuthService } from './../../_services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from "../../_services";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  authForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private alertService: AlertService,
    private auth:AuthService
  ) {
    this.authForm = formBuilder.group({ 
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],       
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/), Validators.minLength(8), Validators.maxLength(100)])],
      termsAndServices: ['', Validators.compose([Validators.required])]
    });
  }

  submitForm(value: any) {
    if(this.authForm.valid) {
      let credentials = {
        email: value.email,
        password: value.password
      };
      this.auth.signUp(credentials).then(
        () => this.navCtrl.setRoot("SidemenuPage"),
        error => this.alertService.error(error)
      );
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  seePrivacyPolicy(){
    this.alertService.success('Under Construction');
  }

}

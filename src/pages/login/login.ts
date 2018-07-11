import { AlertService } from './../../_services/alert.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  authForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private alertService: AlertService
    ) {
      this.authForm = formBuilder.group({        
        email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
        password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/), Validators.minLength(8), Validators.maxLength(100)])]
    });
  }

  submitForm(value: any) {
    if(this.authForm.valid) {
      let credentials = {
        email: value.email,
        password: value.password
      };
      this.auth.signInWithEmail(credentials)
        .then(
          () => this.navCtrl.setRoot("SidemenuPage"),
          error => this.alertService.error(error)
        )
        .catch();
    }
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        () => this.navCtrl.setRoot("SidemenuPage"),
        error => this.alertService.error(error)
      )
      .catch();
  }

  loginWithFacebook() {
    this.auth.signInWithFacebook()
      .then(
        () => this.navCtrl.setRoot("SidemenuPage"),
        error => this.alertService.error(error)
      )
      .catch();
  }

  gotoSignup() {
    this.navCtrl.push("SignupPage");
  }

  gotoForgotPassword() {
    this.navCtrl.push("ForgotpasswordPage");
  }

}

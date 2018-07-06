import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    public formBuilder: FormBuilder
    ) {
      this.authForm = formBuilder.group({        
        email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
        password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/), Validators.minLength(8), Validators.maxLength(100)])]
    });
  }

  submitForm(value: any) {console.log(value);
    if(this.authForm.valid) {
      console.log(value);
    }
    this.navCtrl.setRoot("SidemenuPage");
  }

  gotoSignup() {
    this.navCtrl.push("SignupPage");
  }

  gotoForgotPassword() {
    this.navCtrl.push("ForgotpasswordPage");
  }

}

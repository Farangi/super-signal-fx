import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from "../../_services";
import { AuthService } from "../../_services";
import { ContactService } from '../../_services';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage implements OnInit {

  private loader: any;
  contactForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertService: AlertService,
    private authService: AuthService,
    private contactService: ContactService
    ) {
      this.contactForm = formBuilder.group({  
        name: [this.authService.getDisplayName(), Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],     
        email: [this.authService.getEmail(), Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
        subject: ['', Validators.compose([Validators.required, Validators.maxLength(80)])],
        message: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])]
      });
  }

  ngOnInit(){
    //this.getSettings();
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
 
    this.loader.present();
  }

  submitForm(value: any) {console.log(value);
    if(this.contactForm.valid) {
      this.presentLoading('Sending...');

      let data = {
        userId: this.authService.currentUserId,
        subject: 'Support - '+value.subject,
        userEmail: value.email,
        html: `
              <div>From: ${value.name}</div>
              <div>Email: <a href="mailto:${value.email}">${value.email}</a></div>
              <div>Date: ${moment().format('ddd MMM DD YYYY HH:MM:SS Z')}</div>
              <div>Message: ${value.message}</div>`
      }

      /* let data = {
        userId: this.authService.currentUserId,
        name: value.name,
        userEmail: value.email,
        subject: 'Support - '+value.subject,
        message: value.message,
        date: moment().format('ddd MMM DD YYYY HH:MM:SS Z')
      } */

      this.contactService.addMessage(data).then(
        () => {
          this.alertService.success('Message Sent Successfully.');
          this.loader.dismiss();
        },
        error => {
          this.alertService.error('An error occured try again.');
          this.loader.dismiss();
        }
      );
    }
    else {
      this.alertService.error('Data is not valid.')
    }
  }

}

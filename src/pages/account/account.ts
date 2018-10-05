import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from "../../_services";
import { AuthService } from "../../_services";
import { UserService } from "../../_services";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit {

  private loader: any;
  emailForm: FormGroup;
  nameForm: FormGroup;

  userName: any ='';
  settings: any = {pushNotifications:true, emailNotifications: true};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private alertService: AlertService,
    private authService: AuthService,
    private userService: UserService
    ) {
      this.userName = this.authService.getDisplayName();

      this.emailForm = formBuilder.group({       
        email: [this.authService.getEmail(), Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
        password: ['', Validators.compose([Validators.required])]
      });

      this.nameForm = formBuilder.group({       
        name: [this.userName, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      });
  }

  ngOnInit(){
    this.getSettings();
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
 
    this.loader.present();
  }

  getSettings(){
    this.presentLoading('Loading...');
    this.userService.getSettings().then(
      (data) => {
        if(data !== undefined && data !== null && data !== '') {
          this.settings = data;
        }
        this.loader.dismiss();
      },
      error => {
        this.alertService.error('An error occured please try again.');
        this.loader.dismiss();
      }
    );
  }

  updateName(value) {console.log(value);
    let alert = this.alertCtrl.create({
      title: 'Confirm!',
      message: 'Are you sure you want to update your name?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Yes',
          handler: () => {
            if(this.nameForm.valid) {
              this.presentLoading('Updating...');

              let profile = {
                displayName: value.name,
                photoURL: ''
              };
              this.authService.updateProfile(profile).then(
                () => {
                  this.userName = profile.displayName;
                  this.alertService.success('Name updated successfully.');
                  this.loader.dismiss();
                },
                error => {
                  this.alertService.error('An error occured please try again.');
                  this.loader.dismiss();
                }
              );
            }
          }
        }
      ]
    });
    alert.present();
  }

  updateEmail(value: any) {console.log(value);
    if(this.emailForm.valid) {
      let alert = this.alertCtrl.create({
        title: 'Confirm!',
        message: 'Are you sure you want to update your email?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.presentLoading('Updating...');
  
              let data = {
                newEmail: value.email,
                password: value.password
              }
        
              this.authService.updateEmail(data).then(
                () => {
                  this.alertService.success('Email updated successfully.');
                  this.loader.dismiss();
                },
                error => {
                  if(error.code === "auth/wrong-password"){
                    this.alertService.error('Password is invalid.');
                  }
                  else{
                    this.alertService.error('An error occured please try again.');
                  }
                  this.loader.dismiss();
                }
              );
            }
          }
        ]
      });
      alert.present();
    }
    else {
      this.alertService.error('Email or Password is not valid.')
    }
  }
  
  updatePassword(){
    let alert = this.alertCtrl.create({
      title: 'Confirm!',
      message: 'An email will be sent to you to reset password and you will be logged out. Do you want to change the password?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.presentLoading('Sending...');

            this.authService.resetPassword(this.authService.getEmail()).then(
              () => {
                this.alertService.success('An email has been sent to you to reset the password.');
                this.loader.dismiss();
                this.authService.signOut().then(
                  () => {
                    this.navCtrl.setRoot("LoginPage");
                  },
                  error => {
                  }
                );
              },
              error => {
                this.alertService.error('An error occured please try again.');
                this.loader.dismiss();
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  updateSettings(){
    this.presentLoading('Updating...');

    this.userService.updateSettings(this.settings).then(
      () => {
        this.alertService.success('Setting updated successfully.');
        this.loader.dismiss();
      },
      error => {
        this.alertService.error('An error occured please try again.');
        this.loader.dismiss();
      }
    );
  }

}

import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController, Nav } from 'ionic-angular';

import { AlertService } from "../../_services";
import { AuthService } from "../../_services";

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-sidemenu',
  templateUrl: 'sidemenu.html',
})
export class SidemenuPage {

  private loader: any;
  rootPage = 'TabsPage';

  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Home', pageName: 'HomePage', tabComponent: 'HomePage', index: 0, icon: 'home' },
    { title: 'Results', pageName: 'ResultsPage', tabComponent: 'ResultsPage', index: 1, icon: 'filing' },
    { title: 'Account', pageName: 'AccountPage', tabComponent: 'AccountPage', index: 2, icon: 'person' },
  ];

  constructor(
    private app: App,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertService: AlertService
    ) {
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
 
    this.loader.present();
  }

  openPage(page: PageInterface) {
    let params = {};
    let childNav = this.nav.getActiveChildNavs()[0];

    if (page.index) {
      params = { tabIndex: page.index };
    }

    if (childNav && page.index != undefined) {
      childNav.select(page.index);
      //this.tabsNav.select(page.index);
    } else {
      this.nav.setRoot(page.pageName, params);
    }
  }
 
  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

  /* gotoIntro() {
    this.navCtrl.setRoot("IntroPage");
  } */

  showFaqs() {
    this.app.getRootNav().push("FaqsPage");
  }

  showContactus(){
    this.app.getRootNav().push("ContactusPage");
  }

  logOut() {
    this.presentLoading('Signing Out...');

    this.authService.signOut().then(
      () => {
        this.loader.dismiss();
        this.navCtrl.setRoot("LoginPage");
      },
      error => {
        this.loader.dismiss();
        this.alertService.error('An error occured please try again.');
      }
    );
  }

}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

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

  rootPage = 'TabsPage';

  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Home', pageName: 'HomePage', tabComponent: 'HomePage', index: 0, icon: 'home' },
    { title: 'Results', pageName: 'ResultsPage', tabComponent: 'ResultsPage', index: 1, icon: 'filing' },
    { title: 'Account', pageName: 'AccountPage', tabComponent: 'AccountPage', index: 2, icon: 'person' },
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {
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

  logOut() {
    this.navCtrl.setRoot("LoginPage");
  }

}

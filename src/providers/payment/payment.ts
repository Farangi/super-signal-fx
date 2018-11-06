import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';

import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Observable } from "../../../node_modules/rxjs";
/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {
  userId: string;
  membership: Observable<{}>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe((user) => {
      if(user){
        //console.log("hello "+ this.membership);
        this.userId = user.uid;
        this.membership = this.db.object(`users/${user.uid}/pro-membership`).valueChanges();
        //console.log("hello "+JSON.stringify(this.membership));
      }
    });
    // this.membership = this.afAuth.authState
    // .do(user => this.userId = user.uid)
    // .switchMap(user => {
    //   return this.db.object(`users/${user.uid}/pro-membership`);
    // });
  }

  checkMembership() {
    return this.afAuth.authState.switchMap(user => {
      return this.db.object(`users/${user.uid}/pro-membership`).valueChanges();
    });
  }

  processPayment(token: any) {
    return this.db.object(`/users/${this.userId}/pro-membership`)
    .update({ token: token.id });
  }
}

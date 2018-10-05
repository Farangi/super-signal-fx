import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

interface DisclaimerData {
    text: string;
}
                  
@Injectable()
export class DisclaimerService {

    constructor(
        private db: AngularFirestore
    ) {
        // For time error
        db.firestore.settings({ timestampsInSnapshots: true });        
    }

    public getDisclaimer(){
        let disclaimer: Observable<DisclaimerData>;

        disclaimer = this.db.doc<DisclaimerData>(`disclaimer/1`).valueChanges();

        return disclaimer;
    }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

import { map } from 'rxjs/operators';

interface FaqsData {
    q: string;
    a: string;
}
                  
@Injectable()
export class FaqsService {

    constructor(
        private db: AngularFirestore
    ) {
        // For time error
        db.firestore.settings({ timestampsInSnapshots: true });        
    }

    public getAllFaqs(){
        let faqs: Observable<FaqsData []>;

        faqs = this.db.collection<FaqsData>(`faqs`).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as FaqsData;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );

        return faqs;
    }

}

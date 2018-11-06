import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

import { map } from 'rxjs/operators';
import { combineLatest } from "rxjs/observable/combineLatest";

interface SignalData {
    symbol: string;
    date: string;
    direction?: string;
    status?: string;
    pips?: number;
    situation?: string;
    profitSecurity: string;
    entry?: number;
    takeProfit?: number;
    stopLoss?: number;
    moneyManagement: string;
    rule1?: string;
    rule2?: string;
    rule3?: string;
    premium: boolean;
}

@Injectable()
export class SignalService {

    //private signalsCollection: AngularFirestoreCollection<SignalData>;

    constructor(
        private db: AngularFirestore
    ) {
        // For time error
        db.firestore.settings({ timestampsInSnapshots: true });
    }

    public addData() {
        let signalsRef = this.db.collection(`signals`);

        let data = {
            symbol:'ABC', date:'2018-10-03T20:27:14Z', direction:'Sell by market',
            status:'closed', pips:-150, situation: 'TP2 reached', profitSecurity:'Stop loss moved to breakeven',
            entry: 1.1030, takeProfit:1.203, stopLoss:1.1030,
            moneyManagement:'Use 0.06 lot max per trade every $600 in balance account',
            rule1:'Move stop loss to breakeven when 1.1100 is reached',
            rule2:'Use 0.01 lot each $1000 in balance account',
            rule3:'Close half position when 1.1070 is reached',
            sendPushNotification: true,
            sendEmailNotification: true,
        };
        signalsRef.add(data);
    }

    public getAllSignals(){
        let data = this.db.collection<SignalData>(`signals`).snapshotChanges();
        //console.log(data[0].payload.doc.metadata.fromCache);
        return data.pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as SignalData;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    public getActiveAndPendingSignals(){
        let signals1: Observable<SignalData []>;
        let signals2: Observable<SignalData []>;

        signals1 = this.db.collection<SignalData>(`signals`, ref =>
        ref.where('status', '==', 'active')).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as SignalData;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );

        signals2 = this.db.collection<SignalData>(`signals`, ref =>
        ref.where('status', '==', 'pending')).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as SignalData;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );

        return combineLatest(signals1,signals2).pipe(
            map(([one, two]) => [...one, ...two])
        )

    }

}

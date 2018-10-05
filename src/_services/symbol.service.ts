import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

interface SymbolData {
    name: string;
    value: string;
}
                  
@Injectable()
export class SymbolService {

    constructor(
        private db: AngularFirestore
    ) {
        // For time error
        db.firestore.settings({ timestampsInSnapshots: true });        
    }

    public getAllSymbols(){
        let symbols: Observable<SymbolData []>;

        symbols = this.db.collection<SymbolData>(`symbols`).valueChanges();

        return symbols;
    }

}

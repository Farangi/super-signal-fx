import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

interface ContactData {
    userId: string,
    subject: string;
    userEmail:string;
    html: string;
}

/* interface ContactData {
    userId: string,
    name: string;
    html: string;
    subject: string;
    message: string;
    date: string;
} */
                  
@Injectable()
export class ContactService {

    constructor(
        private db: AngularFirestore
    ) {
        // For time error
        db.firestore.settings({ timestampsInSnapshots: true });        
    }

    public addMessage(data: ContactData){
        let contactsRef = this.db.collection<ContactData>(`support_messages`);
        return contactsRef.add(data);
    }

}

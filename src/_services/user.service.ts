import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthService } from "../_services";

interface UserSettingsData {
    pushNotifications: string;
    emailNotifications: string;
}
                  
@Injectable()
export class UserService {

    constructor(
        private db: AngularFirestore,
        private authService:AuthService
    ) {
        // For time error
        db.firestore.settings({ timestampsInSnapshots: true });        
    }

    public getSettings(){
        return new Promise<any>((resolve, reject) => {
            this.db.doc<UserSettingsData>(`user_settings/${this.authService.currentUserId}`).ref.get()
            .then(doc => {
                resolve(doc.data());
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    public updateSettings(settings){
        const userRef: AngularFirestoreDocument<any> = this.db.doc(`user_settings/${this.authService.currentUserId}`);
        return userRef.set(settings);
    }

}

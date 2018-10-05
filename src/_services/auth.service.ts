import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
	private user: firebase.User;

    constructor(
        public afAuth: AngularFireAuth
     ) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(credentials) {
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
    }

    /* signUp(credentials) {
        return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(credentials.email, 
            credentials.password);
    } */
    
    signUp(credentials) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(credentials.email, credentials.password)
              .then(res => {
                let profile = {
                    displayName: credentials.displayName,
                    photoURL: ''
                };
                this.updateProfile(profile)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    resolve(res);
                });
              })
              .catch(err => {
                reject(err);
              }
            );
        });
    }

    get authenticated(): boolean {
        return this.user !== null;
    }

    get currentUser(): any {
        return this.afAuth.authState
    }

    get currentUserObservable(): any {
        return this.afAuth.authState
    }

    get currentUserId(): string {
        return this.authenticated ? this.user.uid : '';
    }

    getEmail() {
        return this.user && this.user.email;
    }

    getDisplayName() {
        return this.user && this.user.displayName;
    }

    signOut(): Promise<void> {
        return this.afAuth.auth.signOut();
    }

    signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
    }

    signInWithFacebook() {
		console.log('Sign in with facebook');
		return this.oauthSignIn(new firebase.auth.FacebookAuthProvider());
    }

    private oauthSignIn(provider: AuthProvider) {
        if (!(<any>window).cordova) {
            return this.afAuth.auth.signInWithPopup(provider);
        } else {
            return this.afAuth.auth.signInWithRedirect(provider)
            .then(() => {
                return this.afAuth.auth.getRedirectResult().then( result => {
                    // This gives you a Google Access Token.
                    // You can use it to access the Google API.
                    let token = result.credential.accessToken;
                    // The signed-in user info.
                    let user = result.user;
                    console.log(token, user);
                }).catch(function(error) {
                    // Handle Errors here.
                    alert(error.message);
                });
            });
        }
    }

    public updateProfile(profile){
        const user = firebase.auth().currentUser;
        return user.updateProfile({
            displayName: profile.displayName,
            photoURL: profile.photoURL
        });
    }

    resetPassword(email: string) {
        var auth = firebase.auth();
        return auth.sendPasswordResetEmail(email);
    }

    updateEmail(data){
         const credentials = firebase.auth.EmailAuthProvider.credential(
            this.getEmail(), 
            data.password
        );

        return new Promise<any>((resolve, reject) => {
            this.user.reauthenticateAndRetrieveDataWithCredential(credentials)
            .then(user => {
                this.user.updateEmail(data.newEmail)
                .then(user => {
                    resolve('Success');
                })
                .catch(err => {
                    reject(err);
                });
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }

}
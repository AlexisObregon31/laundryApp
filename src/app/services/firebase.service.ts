import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone) {

    /*this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }

       SignIn(email, password) {
        return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password)
      }

      // Register user with email/password
      RegisterUser(email, password) {
        return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password)
      }

      // Email verification when new user register
      SendVerificationMail() {
        return this.ngFireAuth.auth.currentUser.sendEmailVerification()
          .then(() => {
            this.router.navigate(['verify-email']);
          })
      }

      PasswordRecover(passwordResetEmail) {
        return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
          .then(() => {
            window.alert('Password reset email has been sent, please check your inbox.');
          }).catch((error) => {
            window.alert(error)
          })
      }

      // Returns true when user is looged in
      get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
      }

      get isEmailVerified(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user.emailVerified !== false) ? true : false;
      }

      // Sign in with Gmail
      GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
      }

      // Auth providers
      AuthLogin(provider) {
        return this.ngFireAuth.auth.signInWithPopup(provider)
          .then((result) => {
            this.ngZone.run(() => {
              this.router.navigate(['dashboard']);
            })
            this.SetUserData(result.user);
          }).catch((error) => {
            window.alert(error)
          })
      }

      // Sign-out
      SignOut() {
        return this.ngFireAuth.auth.signOut().then(() => {
          localStorage.removeItem('user');
          this.router.navigate(['login']);
        })
      }*/

  }
}


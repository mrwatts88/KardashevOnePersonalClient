import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import * as firebase from 'firebase';

@Injectable()
export class User {

  constructor(public api: Api) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
      } else {
        this.logout();
      }
    });
  }

  // Send a POST request to our login endpoint  
  login(accountInfo: any) {
    return new Promise((res, rej) => {
      firebase.auth().signInWithEmailAndPassword(accountInfo.email, accountInfo.password).then((user) => {
        res(user);
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        rej(errorMessage);
      });
    });
  }

  // Send a POST request to our signup endpoint (firebase)
  signup(accountInfo: any) {
    return new Promise((res, rej) => {
      firebase.auth().createUserWithEmailAndPassword(accountInfo.email, accountInfo.password).then((user) => {
        console.log('legged in');
        res(user);
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        rej(errorMessage);
      });
    });
  }

  // Log the user out, forget the session  
  logout() {
    //TODO: Show login page
  }
}
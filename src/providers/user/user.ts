import 'rxjs/add/operator/toPromise'
import { Injectable } from '@angular/core'
import { Api } from '../api/api'
import * as firebase from 'firebase'

@Injectable()
export class User {
  constructor(public api: Api) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        let displayName = user.displayName
        let email = user.email
        let emailVerified = user.emailVerified
        let photoURL = user.photoURL
        let isAnonymous = user.isAnonymous
        let uid = user.uid
        let providerData = user.providerData
      } else
        this.logout()
    })
  }

  signup(accountInfo: any) {
    return firebase.auth().createUserWithEmailAndPassword(accountInfo.email, accountInfo.password)
  }

  login(accountInfo: any) {
    return firebase.auth().signInWithEmailAndPassword(accountInfo.email, accountInfo.password)
  }

  logout() {
    //TODO: Show login page 
  }
}
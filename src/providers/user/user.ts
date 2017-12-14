import { Injectable } from '@angular/core'
import { Api } from '../api/api'
import * as firebase from 'firebase'
import { FirebaseError } from 'firebase'
import { FirebaseProvider } from '../../providers/firebase/firebase'

import { User } from '../../models/user'

@Injectable()
export class UserProvider {
  constructor(
    public firebaseProvider: FirebaseProvider,
    public api: Api) {

    // TODO: Decide when to call this, and whether to persist authentication
    // the auth state is changed immediately after this listener is defined
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('change')
        // TODO: Firestore is not allowing a custom object to be passed into firestore.add(), see what we can do
        // let _user = new User(user)
        let _user = {
          'displayName': user.displayName,
          'email': user.email,
          'emailVerified': user.emailVerified,
          'phoneNumber': user.phoneNumber,
          'isAnonymous': user.isAnonymous,
          'photoURL': user.photoURL,
          'uid': user.uid
        }
        this.firebaseProvider.initFCM(_user)

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

  setPhoneNumber(phoneNumber: string){
    console.log(firebase.auth().currentUser.uid + ', ' + phoneNumber)
    return this.firebaseProvider.setPhoneNumber(phoneNumber, firebase.auth().currentUser.uid)
  }
}
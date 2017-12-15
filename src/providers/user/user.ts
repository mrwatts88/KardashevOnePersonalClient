import { Injectable } from '@angular/core'
import { Api } from '../api/api'
import { FirebaseError } from 'firebase'
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { FirestoreProvider } from '../../providers/firestore/firestore'
import { User } from '../../models/user'
import * as firebase from 'firebase'


@Injectable()
export class UserProvider {
  constructor(
    public firestoreProvider: FirestoreProvider,
    public firebaseProvider: FirebaseProvider,
    public api: Api) { }

  signup(accountInfo: any) {
    return firebase.auth().createUserWithEmailAndPassword(accountInfo.email, accountInfo.password)
  }

  login(accountInfo: any) {
    return firebase.auth().signInWithEmailAndPassword(accountInfo.email, accountInfo.password).then(
      () => {
        this.firebaseProvider.getFcmToken()
          .then(token => this.updateFcmToken(token))
          .catch(err => console.log(err))
      }
    ).catch((err) => { console.log(err) })
  }

  logout() {
    return firebase.auth().signOut()
  }

  updateFcmToken(token) {
    return this.firestoreProvider.updateFcmToken(firebase.auth().currentUser.uid, token)
  }
}
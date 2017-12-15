import { Injectable } from '@angular/core'
import { Api } from '../api/api'
import { FirebaseError } from 'firebase'
import { FirestoreProvider } from '../../providers/firestore/firestore'
import { User } from '../../models/user'
import * as firebase from 'firebase'


@Injectable()
export class UserProvider {
  constructor(
    public firestoreProvider: FirestoreProvider,
    public api: Api) { }

  signup(accountInfo: any) {
    return firebase.auth().createUserWithEmailAndPassword(accountInfo.email, accountInfo.password)
  }

  login(accountInfo: any) {
    return firebase.auth().signInWithEmailAndPassword(accountInfo.email, accountInfo.password).then(
      () => firebase.messaging().getToken().then(token => this.updateFCMToken(token)).catch(err => console.log(err))
    )
  }

  logout() {
    return firebase.auth().signOut()
  }

  updateFCMToken(fcmToken: string) {
    return this.firestoreProvider.updateFCMToken(firebase.auth().currentUser.uid, fcmToken)
  }
}
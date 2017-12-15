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
    public api: Api) {
  }

  signup(accountInfo: any) {
    return firebase.auth().createUserWithEmailAndPassword(accountInfo.email, accountInfo.password)
  }

  login(accountInfo: any) {
    return firebase.auth().signInWithEmailAndPassword(accountInfo.email, accountInfo.password).then(
      () => {
        firebase.messaging().getToken()
          .then(refreshedToken => {
            console.log(refreshedToken)
            this.updateFCMToken(refreshedToken)
          })
          .catch(err => console.log('Unable to retrieve refreshed token ', err))
      }

    )
  }

  logout() {
    return firebase.auth().signOut()
  }

  updateFCMToken(fcmToken: string) {
    return this.firestoreProvider.updateFCMToken(firebase.auth().currentUser.uid, fcmToken)
  }
}
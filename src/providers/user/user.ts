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
    let _user
    return firebase.auth().createUserWithEmailAndPassword(accountInfo.email, accountInfo.password)
      .then(user => {
        _user = {
          uid: user.uid,
          displayName: accountInfo.name,
          username: accountInfo.username,
          email: user.email,
          phoneNumber: accountInfo.phoneNumber,
          fcmToken: undefined
        }
        this.firebaseProvider.getFcmToken().then(token => {
          _user.fcmToken = token
          this.firestoreProvider.insertUser(_user)
        }).catch(err => { throw err})
      }).catch(err => {throw err })
  }

  login(accountInfo: any) {
    return firebase.auth().signInWithEmailAndPassword(accountInfo.email, accountInfo.password).then(
      () => this.firebaseProvider.getFcmToken())
      .then(token => this.firestoreProvider.updateFcmToken(firebase.auth().currentUser.uid, <string>token))
      .catch(err => {
        throw err
      })
  }

  logout() {
    return firebase.auth().signOut()
  }
}
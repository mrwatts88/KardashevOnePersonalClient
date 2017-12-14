import { Injectable } from '@angular/core'
import { Api } from '../api/api'
import * as firebase from 'firebase'
import { FirebaseError } from 'firebase'
import { FirestoreProvider } from '../../providers/firestore/firestore'

import { User } from '../../models/user'

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
    return firebase.auth().signInWithEmailAndPassword(accountInfo.email, accountInfo.password)
  }

  logout() {
    //TODO: Show login page 
  }

  setPhoneNumber(phoneNumber: string){
    console.log(firebase.auth().currentUser.uid + ', ' + phoneNumber)
    return this.firestoreProvider.setPhoneNumber(phoneNumber, firebase.auth().currentUser.uid)
  }
}
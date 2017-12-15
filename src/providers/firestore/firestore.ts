import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import 'firebase/firestore'

@Injectable()
export class FirestoreProvider {
  private db: firebase.firestore.Firestore

  constructor() {
    this.db = firebase.firestore()
  }

  createUser(userData) {
    this.db.collection("UserData").doc(userData.uid).set(userData).then(() => {
      console.log("Document written with ID: ", userData.uid)
    }).catch(err => {
      console.log("Error creating user in database ", err)
    })
  }

  updateFCMToken(uid: string, fcmToken: string) {
    return this.db.collection("UserData").doc(uid).update({
      fcmToken: fcmToken
    })
  }
}
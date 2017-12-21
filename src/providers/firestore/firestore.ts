import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import 'firebase/firestore'

@Injectable()
export class FirestoreProvider {
  private db: firebase.firestore.Firestore

  constructor() {
    this.db = firebase.firestore()
  }

  getPendingShipments(uid: string){
    return this.db.collection("UserData").doc(uid).get().then(result => {
      return result.get("pendingShipments")
    })
  }

  insertUser(userData) {
    return this.db.collection("UserData").doc(userData.uid).set(userData)
  }

  updateFcmToken(uid: string, fcmToken: string) {
    return this.db.collection("UserData").doc(uid).update({
      fcmToken: fcmToken
    })
  }
}
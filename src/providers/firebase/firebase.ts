import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Api } from '../api/api'
import { FCM } from '@ionic-native/fcm'
import { Platform } from 'ionic-angular'
import { FirestoreProvider } from '../../providers/firestore/firestore'
import * as firebase from 'firebase'

@Injectable()
export class FirebaseProvider {
  private messaging: firebase.messaging.Messaging

  constructor(
    public plt: Platform,
    private fcm: FCM,
    private api: Api,
    public firestoreProvider: FirestoreProvider
  ) {
    this.messaging = firebase.messaging()
    this.messaging.onMessage(payload => console.log(payload))
    this.messaging.onTokenRefresh(() =>
      this.messaging.getToken().then(token => this.firestoreProvider.updateFcmToken(firebase.auth().currentUser.uid, token))
        .catch(err => console.error(err))
    )
  }

  getFcmToken() {
    return new Promise((res, rej) => {
      if (this.plt.is('mobile')) {
        this.fcm.getToken().then(currentToken => {
          if (currentToken)
            res(currentToken)
        }).catch(err => rej(err))
      } else {
        this.messaging.requestPermission().then(() => {
          this.messaging.getToken().then(currentToken => {
            if (currentToken)
              res(currentToken)
          }).catch(err => rej(err))
        })
      }
    })
  }
}
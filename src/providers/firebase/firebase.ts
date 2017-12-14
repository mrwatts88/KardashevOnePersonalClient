import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Api } from '../api/api'
import { FCM } from '@ionic-native/fcm'
import { Platform } from 'ionic-angular'
import { UserProvider } from '../user/user'
import * as firebase from 'firebase'




@Injectable()
export class FirebaseProvider {
  private messaging: firebase.messaging.Messaging

  constructor(
    public plt: Platform,
    private fcm: FCM,
    private api: Api,
    private userProvider: UserProvider
    
  ) { }

  initFCM() {
    this.messaging = firebase.messaging()
    console.log(this.messaging)

    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a sevice worker
    //   `messaging.setBackgroundMessageHandler` handler.
    this.messaging.onMessage(payload => console.log("Message received.", payload))

    // Callback fired if Instance ID token is updated.
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
        .then(refreshedToken => this.userProvider.updateFCMToken(refreshedToken))
        .catch(err => console.log('Unable to retrieve refreshed token ', err))
    })
  }

  getInitialFCMToken(user) {
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
        }).catch(err => rej(err))
      }
    })
  }
}
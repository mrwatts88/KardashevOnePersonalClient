import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Api } from '../api/api'
import { FCM } from '@ionic-native/fcm'
import { Platform } from 'ionic-angular'
import * as firebase from 'firebase'
import 'firebase/firestore'


@Injectable()
export class FirebaseProvider {
  private messaging: firebase.messaging.Messaging
  private db

  constructor(
    public plt: Platform,
    private fcm: FCM,
    private api: Api) { }

  initFCM(user) {
    this.messaging = firebase.messaging()
    this.db = firebase.firestore()
    let self = this

    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a sevice worker
    //   `messaging.setBackgroundMessageHandler` handler.
    this.messaging.onMessage(payload => console.log("Message received.", payload))

    // Callback fired if Instance ID token is updated.
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
        .then(refreshedToken => {
          // Indicate that the new Instance ID token has not yet been sent to the app server.
          setTokenSentToServer(false)
          // Send Instance ID token to app server.
          user.fcmToken = refreshedToken
          sendUserToServer(user)
        })
        .catch(err => console.log('Unable to retrieve refreshed token ', err))
    })

    if (this.plt.is('mobile')) {
      this.fcm.getToken()
        .then(currentToken => {
          if (currentToken) {
            // TODO: Handle multiple tokens for the same user
            user.fcmToken = currentToken
            sendUserToServer(user)
          }
          else
            setTokenSentToServer(false)
        })
        .catch(function (err) {
          console.log('An error occurred while retrieving token. ', err)
          setTokenSentToServer(false)
        })
    } else {
      this.messaging.requestPermission()
        .then(() => {
          self.messaging.getToken()
            .then(currentToken => {
              if (currentToken) {
                user.fcmToken = currentToken
                sendUserToServer(user)
              } else
                setTokenSentToServer(false)
            })
            .catch(err => {
              console.log('An error occurred while retrieving token. ', err)
              setTokenSentToServer(false)
            })
        })
        .catch(err => console.log('Unable to get permission to notify.', err))
    }

    // Send the Instance ID token to the application server, so that it can:
    // - send messages back to this app
    // - subscribe/unsubscribe the token from topics
    function sendUserToServer(userData) {
      self.db.collection("UserData").doc(userData.uid).set(userData)
        .then(() => console.log("Document written with ID: ", userData.uid))
        .catch(function (error) {
          console.error("Error adding document: ", error)
        })
      
      // TODO: See if this boolean still makes sense
      // I think we should check if there is a token to add to the user,
      // and if there is, send userData to the db, otherwise don't
      if (!isTokenSentToServer()) {
        setTokenSentToServer(true)
      }
    }

    function isTokenSentToServer() {
      return window.localStorage.getItem('sentToServer') == '1'
    }

    function setTokenSentToServer(sent) {
      window.localStorage.setItem('sentToServer', sent ? '1' : '0')
    }
  }
}
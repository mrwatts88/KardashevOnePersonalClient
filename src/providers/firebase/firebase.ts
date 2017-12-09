import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { Api } from '../api/api';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseProvider {

  private messaging: firebase.messaging.Messaging;
  constructor(private _firebaseApp: FirebaseApp, private api:Api) { }

  init() {
    this.messaging = firebase.messaging(this._firebaseApp);
    let self = this;

    this.messaging.requestPermission()
      .then(function () {
        self.messaging.getToken()
          .then(function (currentToken) {
            if (currentToken) {
              sendTokenToServer(currentToken);
            } else {
              setTokenSentToServer(false);
            }
          })
          .catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
            setTokenSentToServer(false);
          });
      }).catch(function (err) {
        console.log('Unable to get permission to notify.', err);
      });

    // Callback fired if Instance ID token is updated.
    this.messaging.onTokenRefresh(function () {
      this.messaging.getToken()
        .then(function (refreshedToken) {
          console.log('Token refreshed.');
          // Indicate that the new Instance ID token has not yet been sent to the
          // app server.
          setTokenSentToServer(false);
          // Send Instance ID token to app server.
          sendTokenToServer(refreshedToken);
        })
        .catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });

    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a sevice worker
    //   `messaging.setBackgroundMessageHandler` handler.
    this.messaging.onMessage(function (payload) {
      console.log("Message received. ", payload);
    });

    // Send the Instance ID token to the application server, so that it can:
    // - send messages back to this app
    // - subscribe/unsubscribe the token from topics
    function sendTokenToServer(currentToken) {
      self.api.post('test', {'token': currentToken}).subscribe(function(){
      });
      if (!isTokenSentToServer()) {
        // Move post request into if block for production
        setTokenSentToServer(true);
      } else {

      }
    }

    function isTokenSentToServer() {
      return window.localStorage.getItem('sentToServer') == '1';
    }

    function setTokenSentToServer(sent) {
      window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    }
  }
}
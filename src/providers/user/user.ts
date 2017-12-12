import { Injectable } from '@angular/core'
import { Api } from '../api/api'
import * as firebase from 'firebase'
import { FirebaseError } from 'firebase'
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { User } from '../../models/user'

@Injectable()
export class UserProvider {
  constructor(public firebaseProvider:FirebaseProvider, public api: Api) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        
        let _user = new User(user)
        console.log('tht')
        this.firebaseProvider.initFCM(_user)         
      } else
        this.logout()
    })
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
}
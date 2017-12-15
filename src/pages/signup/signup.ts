import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { NavController, ToastController } from 'ionic-angular'
import { UserProvider } from '../../providers/user/user'
import { TabsPage } from '../tabs/tabs'
import { FirebaseError } from 'firebase'
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { FirestoreProvider } from '../../providers/firestore/firestore'

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  account: { name: string, email: string, phoneNumber: string, username: string, password: string } = {
    name: 'Matt Watts',
    email: 'mrwatts@uwm.edu',
    phoneNumber: '+14145249627',
    username: 'mrwatts',
    password: 'password'
  }

  private signupErrorString: string

  constructor(
    private navCtrl: NavController,
    private user: UserProvider,
    private toastCtrl: ToastController,
    private translateService: TranslateService,
    private firebaseProvider: FirebaseProvider,
    private firestoreProvider: FirestoreProvider) {
    this.translateService.get('SIGNUP_ERROR').subscribe(value => this.signupErrorString = value)
  }

  signupAndGetFcmTokenAndInsertUserInFirestore() {
    this.user.signup(this.account).then(user => this.getFcmTokenAndInsertUserInFirestore(user)).catch((err) => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'bottom'
      })
      toast.present()
    })
  }

  private getFcmTokenAndInsertUserInFirestore(user) {
    let _user = {
      uid: user.uid,
      displayName: this.account.name,
      username: this.account.username,
      email: user.email,
      phoneNumber: this.account.phoneNumber,
      fcmToken: undefined
    }

    this.firebaseProvider.getFcmToken().then(token => {
      _user.fcmToken = token
      this.insertUserInFirestore(_user)
    }).catch(err => {
      console.error('Could not get a token')
    })
  }

  private insertUserInFirestore(user) {
    this.firestoreProvider.insertUser(user).catch(err => {
      let toast = this.toastCtrl.create({
        message: err + "2",
        duration: 3000,
        position: 'bottom'
      })
      toast.present()
    })
  }
}
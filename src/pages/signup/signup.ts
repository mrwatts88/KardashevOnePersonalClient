import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { NavController, ToastController } from 'ionic-angular'
import { UserProvider } from '../../providers/user/user'
import { TabsPage } from '../tabs/tabs'
import { FirebaseError } from 'firebase'
import { FirebaseProvider } from '../../providers/firebase/firebase'

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  account: { name: string, email: string, phoneNumber: string, username: string, password: string } = {
    name: 'Matt Watts',
    email: 'mrwatts@uwm.edu',
    phoneNumber: '+14145249627',
    username: 'mrwatts',
    password: 'password'
  }

  // translated text string
  private signupErrorString: string

  constructor(public navCtrl: NavController,
    public user: UserProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public firebaseProvider: FirebaseProvider) {
    this.translateService.get('SIGNUP_ERROR').subscribe(value => this.signupErrorString = value)
  }

  signup() {
    this.user.signup(this.account)
      .then(user => {
        let _user = {
          uid: user.uid,
          displayName: this.account.name,
          username: this.account.username,
          email: user.email,
          phoneNumber: this.account.phoneNumber,
          fcmToken: undefined
        }

        this.firebaseProvider.getInitialFCMToken(user).then( FCMToken => {
          _user.fcmToken = FCMToken
          this.navCtrl.push(TabsPage)
        })

        
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: err,
          duration: 3000,
          position: 'bottom'
        })
        toast.present()
      })
  }
}
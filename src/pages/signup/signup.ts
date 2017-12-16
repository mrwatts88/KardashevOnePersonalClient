import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { NavController, ToastController } from 'ionic-angular'
import { UserProvider } from '../../providers/user/user'
import { FcmProvider } from '../../providers/fcm/fcm'
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
  ) {
    this.translateService.get('SIGNUP_ERROR').subscribe(value => this.signupErrorString = value)
  }

  signup() {
    this.user.signup(this.account).catch((err) => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'bottom'
      })
      toast.present()
    })
  }
}
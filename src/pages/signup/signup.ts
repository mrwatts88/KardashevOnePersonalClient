import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { ToastController } from 'ionic-angular'
import { UserProvider } from '../../providers/user/user'

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
import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { NavController, ToastController } from 'ionic-angular'
import { User } from '../../providers/user/user'
import { TabsPage } from '../tabs/tabs'

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  account: { name: string, email: string, username: string, password: string } = {
    name: 'Matt Watts',
    email: 'mrwatts@uwm.edu',
    username: 'mrwatts',
    password: 'password'
  }

  // translated text string
  private signupErrorString: string

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {
    this.translateService.get('SIGNUP_ERROR').subscribe(value => this.signupErrorString = value)
  }

  signup() {
    this.user.signup(this.account)
      .then(user => this.navCtrl.push(TabsPage))
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
import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { NavController, ToastController } from 'ionic-angular'
import { UserProvider } from '../../providers/user/user'
import { TabsPage } from '../tabs/tabs'
import { FirebaseProvider } from '../../providers/firebase/firebase'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { email: string, password: string } = {
    email: 'mrwatts@uwm.edu',
    password: 'password'
  }

  // Translated text string
  private loginErrorString: string

  constructor(public navCtrl: NavController,
    public user: UserProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {
    this.translateService.get('LOGIN_ERROR').subscribe(value => this.loginErrorString = value)
  }

  // Attempt to login in through User service
  login() {
    this.user.login(this.account)
    .then(user => {
      this.navCtrl.push(TabsPage)
    })
    .catch(err => {
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'bottom'
      })
      toast.present()
    })
  }
}
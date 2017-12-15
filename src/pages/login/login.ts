import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { NavController, ToastController } from 'ionic-angular'
import { UserProvider } from '../../providers/user/user'
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { TabsPage } from '../tabs/tabs'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { email: string, password: string } = {
    email: 'mrwatts@uwm.edu',
    password: 'password'
  }

  private loginErrorString: string

  constructor(
    private navCtrl: NavController,
    private user: UserProvider,
    private toastCtrl: ToastController,
    private translateService: TranslateService) {
    this.translateService.get('LOGIN_ERROR').subscribe(value => this.loginErrorString = value)
  }

  login() {
    this.user.login(this.account)
      .then(user => {
        this.navCtrl.push(TabsPage)
      }).catch(err => {
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'bottom'
        })
        toast.present()
      })
  }
}
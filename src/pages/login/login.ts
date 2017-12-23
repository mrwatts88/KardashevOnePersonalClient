import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { ToastController } from 'ionic-angular'
import { UserProvider } from '../../providers/user/user'

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
    private user: UserProvider,
    private toastCtrl: ToastController,
    private translateService: TranslateService) {
    this.translateService.get('LOGIN_ERROR').subscribe(value => this.loginErrorString = value)
  }

  login() {
    this.user.login(this.account).catch(err => {
      let toast = this.toastCtrl.create({
        // message: this.loginErrorString,
        message: 'hello' + err,
        duration: 3000,
        position: 'bottom'
      })
      toast.present()
    })
  }
}
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { TabsPage } from '../tabs/tabs';
import * as firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { email: string, password: string } = {
    email: 'mrwatts@uwm.edu',
    password: 'password'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {
    this.translateService.get('LOGIN_ERROR').subscribe(value => this.loginErrorString = value);
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account)
    .then(user => this.navCtrl.push(TabsPage))
    .catch(err => {
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }
}
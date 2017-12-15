import { Component, ViewChild } from '@angular/core'
import { Nav, NavController } from 'ionic-angular'
import { TabsPage } from '../tabs/tabs'

// Not using this page currently. It is a side drawer menu.  Will probably change to this
// from tabs at some point.

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  // A reference to the ion-nav in our component
   @ViewChild(Nav) nav: Nav

  rootPage: any = TabsPage
  pages: Array<{ title: string, component: any }>

  constructor(public navCtrl: NavController) {
    this.pages = [
      { title: 'Sign in', component: 'LoginPage' },
      { title: 'Signup', component: 'SignupPage' }
    ]
  }

  ionViewDidLoad() { }

  openPage(page) {
    // Reset the content nav to have just this page
    // dont back button to show in this scenario
    //this.nav.setRoot(page.component)
  }
}
import { Component, ViewChild } from '@angular/core'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { TranslateService } from '@ngx-translate/core'
import { Config, Nav, Platform } from 'ionic-angular'
import { FirebaseProvider } from '../providers/firebase/firebase'
import { UserProvider } from '../providers/user/user'
import { WelcomePage } from '../pages/welcome/welcome'
import { TabsPage } from '../pages/tabs/tabs'
import { HistoryPage } from '../pages/history/history'
import { SendPage } from '../pages/send/send'
import { ReceivePage } from '../pages/receive/receive'
import { SettingsPage } from '../pages/settings/settings'
import { ObservableProvider } from '../providers/observable/observable'
import * as firebase from 'firebase'

@Component({
  template: `
  <ion-menu [content]="content" persistant="true">
    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
        <button menuClose ion-item (click)="logout()">
          Log Out
        </button>
      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HistoryPage // TODO: Change to a loading page

  @ViewChild(Nav) nav: Nav

  pages: any[] = [
    { title: 'Send', component: SendPage },
    { title: 'Receive', component: ReceivePage },
    { title: 'History', component: HistoryPage },
    { title: 'Settings', component: SettingsPage }
  ]

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private firebaseProvider: FirebaseProvider,
    private userProvider: UserProvider,
    private observableProvider: ObservableProvider) {

    this.initTranslate()
    firebase.auth().onAuthStateChanged(user => this.nav.setRoot(user ? TabsPage : WelcomePage))

    platform.ready().then(() => {
      // plugins are available
      if (platform.is('mobile')) {
        this.statusBar.styleDefault()
        this.splashScreen.hide()
      }
    })
  }

  initTranslate() {
    this.translate.setDefaultLang('en')
    if (this.translate.getBrowserLang() !== undefined)
      this.translate.use(this.translate.getBrowserLang())
    else
      this.translate.use('en')
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT)
    })
  }

  openPage(page) {
    this.observableProvider.sendMessage(this.pages.indexOf(page))
  }

  logout() {
    this.userProvider.logout()
  }
}
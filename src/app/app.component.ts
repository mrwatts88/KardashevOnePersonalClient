// Contains only a slide in menu and sets the nav root so the app knows what page to start on
import { Component, ViewChild } from '@angular/core'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { TranslateService } from '@ngx-translate/core'
import { Config, Nav, Platform } from 'ionic-angular'
import { Settings } from '../providers/settings/settings'
import { WelcomePage } from '../pages/welcome/welcome'
import * as firebase from 'firebase'
import { TabsPage } from '../pages/tabs/tabs'
import { HistoryPage } from '../pages/history/history'
import { FirebaseProvider } from '../providers/firebase/firebase'

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HistoryPage

  @ViewChild(Nav) nav: Nav

  // used for slide in menu (not currently being used)
  pages: any[] = [
    { title: 'Welcome', component: 'WelcomePage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' }
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, 
    private statusBar: StatusBar, private splashScreen: SplashScreen, private firebaseProvider: FirebaseProvider) {
    

    // TODO: Learn about when to use this
    platform.ready().then(() => {
      firebaseProvider.initFCM()
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault()
      this.splashScreen.hide()
      // TODO: Decide when to call this, and whether to persist authentication
      // the auth state is changed immediately after this listener is defined
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // TODO: Firestore is not allowing a custom object to be passed into firestore.add(), see what we can do
          // let _user = new User(user)
          // this.firebaseProvider.initFCM(_user)
          this.nav.setRoot(TabsPage)
          this.nav.push(TabsPage)
        } else {
          this.nav.setRoot(WelcomePage)
          this.nav.push(WelcomePage)
        }
      })
    })
    this.initTranslate()
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en')

    if (this.translate.getBrowserLang() !== undefined)
      this.translate.use(this.translate.getBrowserLang())
    else
      this.translate.use('en') // Set your language here


    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT)
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component)
  }
}
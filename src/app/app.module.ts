import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Settings } from '../providers/settings/settings';
import { User } from '../providers/user/user';
import { Api } from '../providers/api/api';
import { MyApp } from './app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import { DeliverySend } from '../providers/delivery-send/delivery-send';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { SendPage } from '../pages/send/send';
import { ReceivePage } from '../pages/receive/receive';
import { HistoryPage } from '../pages/history/history';
import { SettingsPage } from '../pages/settings/settings';
import { WelcomePage } from '../pages/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { DeliveryReceive } from '../providers/delivery-receive/delivery-receive';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    ItemCreatePage,
    SendPage,
    ReceivePage,
    HistoryPage,
    SettingsPage,
    WelcomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ItemDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemCreatePage,
    SendPage,
    ReceivePage,
    HistoryPage,
    SettingsPage,
    WelcomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ItemDetailPage
  ],
  providers: [
    Api,
    User,
    DeliverySend,
    DeliveryReceive,
    Camera,
    ScreenOrientation,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
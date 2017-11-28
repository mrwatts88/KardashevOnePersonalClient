import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SendPage } from '../send/send';
import { ReceivePage } from '../receive/receive';
import { SettingsPage } from '../settings/settings';
import { HistoryPage } from '../history/history';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = SendPage;
  tab2Root: any = ReceivePage;
  tab3Root: any = HistoryPage;
  tab4Root: any = SettingsPage;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['TAB3_TITLE']).subscribe(values => {
      this.tab1Title = "Send"
      this.tab2Title = "Receive"
      this.tab3Title = "History"
      this.tab4Title = values['TAB3_TITLE']
    });
  }
}
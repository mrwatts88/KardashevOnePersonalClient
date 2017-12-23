import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { PopoverController } from 'ionic-angular'
import { PopoverPage } from '../popover/popover'
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})

export class HistoryPage {
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController) { }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage)
    popover.present({
      ev: myEvent
    })
  }
}
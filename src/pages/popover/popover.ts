import { Component } from '@angular/core'
import { ViewController } from 'ionic-angular'
import { UserProvider } from '../../providers/user/user'
@Component({
  template: `
      <button ion-item (click)="close()">Logout</button>      
  `
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController, public userProvider: UserProvider) { }

  close() {
    this.viewCtrl.dismiss()
    this.userProvider.logout()
  }
}
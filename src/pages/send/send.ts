import { Component } from '@angular/core'
import { NavController, ModalController, NavParams, AlertController } from 'ionic-angular'
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import { Platform } from 'ionic-angular'
import { DeliverySend } from '../../providers/delivery-send/delivery-send'
import { UserProvider } from '../../providers/user/user'
import { ItemCreatePage } from '../item-create/item-create'
import { ItemDetailPage } from '../item-detail/item-detail'
import { Item } from '../../models/item'
import { PopoverController } from 'ionic-angular'
import { PopoverPage } from '../popover/popover'
import * as firebase from 'firebase'
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {
  shipmentInfo: { recipient: string, sender: string, items: Item[] }

  confirmSendDialogContent: Object = {
    title: 'Are you sure?',
    message: 'Do you want to request this delivery?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => { }
      },
      {
        text: 'Yes',
        handler: () => {
          this.initShipment()
        }
      }
    ]
  }

  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public deliverySend: DeliverySend,
    public plt: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    public userProvider: UserProvider,
    public popoverCtrl: PopoverController) {
    this.resetShipment()

    this.shipmentInfo = {
      recipient: "+12628946758",
      sender: "+14145249627",
      items: [new Item({
        item: "TestItem",
        message: "This is a test item being sent to Matt Watts",
        length: 10,
        width: 15,
        height: 5,
        weight: 25
      })]
    }

    if (this.plt.is('mobile'))
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage)
    popover.present({
      ev: myEvent
    })
  }

  showAddItemPage(): void {
    let addModal = this.modalCtrl.create(ItemCreatePage)
    addModal.present()
    addModal.onDidDismiss(item => {
      if (item)
        this.addItemToShipment(item)
    })
  }

  addItemToShipment(item): void {
    this.shipmentInfo.items.push(new Item(item))
  }

  resetShipment(): void {
    this.shipmentInfo = {
      recipient: "",
      sender: "",
      items: []
    }
  }

  removeItemFromShipment(itemIndex): void {
    this.shipmentInfo.items.splice(itemIndex, 1)
  }

  openItemDetail(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    })
  }

  showConfirmSendDialog() {
    this.alertCtrl.create(this.confirmSendDialogContent).present()
  }

  initShipment() {
    this.shipmentInfo.sender = firebase.auth().currentUser.email
    this.deliverySend.initShipment(this.shipmentInfo).subscribe(resp => { }, err => { })
    this.resetShipment()
  }
}
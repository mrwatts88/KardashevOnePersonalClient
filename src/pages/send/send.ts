import { Component } from '@angular/core'
import { NavController, ModalController, NavParams, AlertController } from 'ionic-angular'
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import { Platform } from 'ionic-angular'
import { DeliverySend } from '../../providers/delivery-send/delivery-send'
import { Item } from '../../models/item'
import { ItemCreatePage } from '../item-create/item-create'
import { ItemDetailPage } from '../item-detail/item-detail'

@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {
  // TODO: Create a shipment class, add sender property
  shipment: { recipient: string, items: Item[] } = {
    recipient: "",
    items: []
  }

  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, public deliverySend: DeliverySend, public plt: Platform, public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation) {
    if (this.plt.is('mobile'))
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  ionViewDidLoad() { }

  showAddItemPage(): void {
    let addModal = this.modalCtrl.create(ItemCreatePage)
    addModal.onDidDismiss(item => {
      if (item)
        this.addItemToShipment(item)
    })
    addModal.present()
  }

  addItemToShipment(item): void {
    this.shipment.items.push(new Item(item))
  }

  clearShipment(): void {
    this.shipment.recipient = ""
    this.shipment.items = []
  }

  removeItemFromShipment(itemIndex): void {
    this.shipment.items.splice(itemIndex, 1)
  }

  openItemDetail(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    })
  }

  showConfirmSendDialog() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you want to request this delivery?',
      buttons: this.confirmSendDialogButtons
    })
    alert.present()
  }

  initShipment() {
    this.deliverySend.initShipment(this.shipment).subscribe(
      resp => { }, err => { }
    )

    this.shipment = {
      recipient: "",
      items: []
    }
  }

  private confirmSendDialogButtons = [{
    text: 'No',
    role: 'cancel',
    handler: () => { }
  },
  {
    text: 'Yes',
    handler: () => {
      this.initShipment()
    }
  }]
}
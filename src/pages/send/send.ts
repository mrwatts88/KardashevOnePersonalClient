import { Component } from '@angular/core'
import { NavController, ModalController, NavParams, AlertController } from 'ionic-angular'
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import { Platform } from 'ionic-angular'
import { DeliverySend } from '../../providers/delivery-send/delivery-send'
import { UserProvider } from '../../providers/user/user'
import { ItemCreatePage } from '../item-create/item-create'
import { ItemDetailPage } from '../item-detail/item-detail'
import { WelcomePage } from '../welcome/welcome'
import { Item } from '../../models/item'

@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {
  // TODO: Create a shipment class, add sender property
  shipmentInfo: { recipient: string, items: Item[] }

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
    public userProvider: UserProvider) {
    this.resetShipment()
    if (this.plt.is('mobile'))
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  showAddItemPage(): void {
    let addModal = this.modalCtrl.create(ItemCreatePage)
    addModal.onDidDismiss(item => {
      if (item)
        this.addItemToShipment(item)
    })
    addModal.present()
  }

  addItemToShipment(item): void {
    this.shipmentInfo.items.push(new Item(item))
  }

  resetShipment(): void {
    this.shipmentInfo = {
      recipient: "",
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
    this.deliverySend.initShipment(this.shipmentInfo).subscribe(resp => { }, err => { })
    this.resetShipment()
  }
}
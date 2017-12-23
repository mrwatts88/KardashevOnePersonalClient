import { Component } from '@angular/core'
import { NavController, ModalController, NavParams, AlertController } from 'ionic-angular'
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import { Platform } from 'ionic-angular'
import { ItemDetailPage } from '../item-detail/item-detail'
import { Item } from '../../models/item'
import { Shipment } from '../../models/shipment'
import { PopoverController } from 'ionic-angular'
import { PopoverPage } from '../popover/popover'
import { ShipmentProvider } from '../../providers/shipment/shipment';
@Component({
  selector: 'page-receive',
  templateUrl: 'receive.html',
})
export class ReceivePage {
  pendingShipments: Shipment[] = []

  constructor(public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public plt: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    public popoverCtrl: PopoverController,
    public shipmentProvider: ShipmentProvider) {
    if (this.plt.is('mobile'))
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  ionViewWillEnter() {
    this.pendingShipments = []
    this.getPendingShipments()
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage)
    popover.present({
      ev: myEvent
    })
  }

  getPendingShipments() {
    this.shipmentProvider.getPendingShipments().then(pendingShipments => {
      for (let shipment of pendingShipments.docs) {
        let _shipment = {
          id: shipment.id,
          data: shipment.data()
        }
        this.pendingShipments.push(new Shipment(_shipment))
      }
    })
  }

  openItemDetail(item: Item) {
    this.navCtrl.push(ItemDetailPage, { item })
  }

  deletePendingShipment(shipment: Shipment, index) {
    this.shipmentProvider.deletePendingShipment(shipment).then(() => {
      this.pendingShipments.splice(index, 1)
    }).catch(err => console.log(err))
  }

  acceptPendingShipment(shipment) {
    // TODO
  }

}
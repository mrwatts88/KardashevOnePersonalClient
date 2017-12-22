import { Component } from '@angular/core'
import { NavController, ModalController, NavParams, AlertController } from 'ionic-angular'
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import { Platform } from 'ionic-angular'
import { DeliveryReceive } from '../../providers/delivery-receive/delivery-receive'
import { ItemDetailPage } from '../item-detail/item-detail'
import { Item } from '../../models/item'

@Component({
  selector: 'page-receive',
  templateUrl: 'receive.html',
})
export class ReceivePage {
  pendingDeliveries: Object[] = []

  constructor(public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public deliveryReceive: DeliveryReceive,
    public plt: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation) {
    if (this.plt.is('mobile'))
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  ionViewWillEnter(){
    this.pendingDeliveries = []
    this.getPendingDeliveries()
  }

  getPendingDeliveries() {
    this.deliveryReceive.getPendingDeliveries().then(pendingShipments => {
      for (let shipment of pendingShipments)
        this.pendingDeliveries.push(shipment)
    })
  }

  openItemDetail(item: Item) {
    this.navCtrl.push(ItemDetailPage, { item: item })
  }
}
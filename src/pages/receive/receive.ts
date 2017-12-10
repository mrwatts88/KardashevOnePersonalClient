import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation'; // Requires native plugin installation
import { Platform } from 'ionic-angular';
import { DeliveryReceive } from '../../providers/delivery-receive/delivery-receive';
import { Item } from '../../models/item';
import { ItemCreatePage } from '../item-create/item-create'
import { ItemDetailPage } from '../item-detail/item-detail'; 

@Component({
  selector: 'page-receive',
  templateUrl: 'receive.html',
})
export class ReceivePage {  

  pendingDeliveries: Object[] = [];

  constructor(public alertCtrl:AlertController, public modalCtrl: ModalController, public deliveryReceive: DeliveryReceive, public plt: Platform, public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation) {
    if(this.plt.is('mobile')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
   }

  ionViewDidLoad() { 
    this.getPendingDeliveries();
  }

  getPendingDeliveries(){
    this.deliveryReceive.getPendingDeliveries().subscribe((deliveryObj)=>{
      for(let delivery of deliveryObj['pending'])
      this.pendingDeliveries.push(delivery);
    });
  }

  openItemDetail(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
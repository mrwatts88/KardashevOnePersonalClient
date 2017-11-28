import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation'; // Requires native plugin installation
import { Platform } from 'ionic-angular';
import { DeliverySend } from '../../providers/delivery-send/delivery-send';
import { Item } from '../../providers/delivery-send/delivery-send';
import { ItemCreatePage } from '../item-create/item-create'


@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {  

  private deliveryInfo: { recipient: string, items: Item[] } = {
    recipient: "2628946758",
    items: []
  };

  constructor(public modalCtrl: ModalController, public deliverySend: DeliverySend, public plt: Platform, public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation) {
    if(this.plt.is('mobile')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
   }

  ionViewDidLoad() { }




  private showAddItemPage():void{
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.addItem(item);
      }
    })
    addModal.present();
    
    
    //this.navCtrl.push(ItemCreatePage);
  }

  private addItem(item):void{         
    this.deliveryInfo.items.push(new Item(item));
  }

  private cancelDelivery():void{
    this.deliveryInfo.recipient = "";
    this.deliveryInfo.items = [];
  }

  private removeItem(itemIndex){
    this.deliveryInfo.items.splice(itemIndex, 1);
  }

  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation'; // Requires native plugin installation
import { Platform } from 'ionic-angular';
import { DeliverySend } from '../../providers/delivery-send/delivery-send';
import { Item } from '../../providers/delivery-send/delivery-send';
import { AddItemPage } from '../add-item/add-item'

/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {  

  private deliveryInfo: { recipient: string, items: Item[] } = {
    recipient: "2628946758",
    items: []
  };

  constructor(public deliverySend: DeliverySend, public plt: Platform, public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation) {
    if(this.plt.is('mobile')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
   }

  ionViewDidLoad() { }

  private showAddItemPage():void{
    this.navCtrl.push(AddItemPage);
  }

  private addItem():void{    
     let item = new Item();
     item.name = "hello";
     this.deliveryInfo.items.push(item);
  }

  private cancelDelivery():void{
    this.deliveryInfo.recipient = "";
    this.deliveryInfo.items = [];
  }
}
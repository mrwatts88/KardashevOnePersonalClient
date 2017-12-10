import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation'; // Requires native plugin installation
import { Platform } from 'ionic-angular';
import { DeliverySend } from '../../providers/delivery-send/delivery-send';
import { Item } from '../../models/item';
import { ItemCreatePage } from '../item-create/item-create'
import { ItemDetailPage } from '../item-detail/item-detail'; 

@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {  

  deliveryInfo: { recipient: string, items: Item[] } = {
    recipient: "",
    items: []
  };

  constructor(public alertCtrl:AlertController, public modalCtrl: ModalController, public deliverySend: DeliverySend, public plt: Platform, public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation) {
    if(this.plt.is('mobile')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
   }

  ionViewDidLoad() { }

  showAddItemPage():void{
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        console.log(item);
        this.addItem(item);
      }
    })
    addModal.present();
  }

  addItem(item):void{         
    this.deliveryInfo.items.push(new Item(item));
  }

  clearDelivery():void{
    this.deliveryInfo.recipient = "";
    this.deliveryInfo.items = [];
  }

  removeItem(itemIndex){
    this.deliveryInfo.items.splice(itemIndex, 1);
  }

  openItemDetail(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  showConfirmSendDialog() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you want to request this delivery?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Do nothing
          }
        },
        {
          text: 'Yes',
          handler: () => {            
            this.deliverySend.requestDelivery(this.deliveryInfo).subscribe(
              (resp) => {
                  console.log(resp);
              }, (err) => {
              
            });;
            this.deliveryInfo = {
              recipient: "",
              items: []
            };
          }
        }
      ]
    });
    alert.present();
  }
}
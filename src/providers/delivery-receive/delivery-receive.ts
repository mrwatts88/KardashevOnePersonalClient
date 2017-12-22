import { Injectable } from '@angular/core'
import { Api } from '../api/api'
import { UserProvider } from '../user/user'
import { Shipment } from '../../models/shipment'

@Injectable()
export class DeliveryReceive {
  constructor(public api: Api, public userProvider: UserProvider) { }

  getPendingDeliveries() {
    return this.userProvider.getPendingShipments()
  }

  deletePendingDelivery(shipment: Shipment){
    return this.userProvider.deletePendingShipment(shipment)
  }
}
import { Injectable } from '@angular/core'
import { Api } from '../api/api'
import { UserProvider } from '../user/user'

@Injectable()
export class DeliveryReceive {
  constructor(public api: Api, public userProvider: UserProvider) { }

  getPendingDeliveries() {
    return this.userProvider.getPendingShipments()
  }
}
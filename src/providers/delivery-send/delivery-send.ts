import { Injectable } from '@angular/core'
import { Api } from '../api/api'

@Injectable()
export class DeliverySend {
  constructor(public api: Api) { }
  
  requestDelivery(deliveryObject) {
    return this.api.post('send', deliveryObject)
  }
}
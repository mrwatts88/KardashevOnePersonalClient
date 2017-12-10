import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeliverySend {
  constructor(public api:Api) { }
  requestDelivery(deliveryObject){ return this.api.post('requestdelivery', deliveryObject); }
}
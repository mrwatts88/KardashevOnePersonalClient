import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class DeliveryReceive {
  constructor(public api: Api) { }

  getPendingDeliveries() {
    return this.api.get('pending');
  }
}
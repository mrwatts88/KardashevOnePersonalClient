import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseProvider } from './../../providers/firebase/firebase';

/*
  Generated class for the DeliveryReceiveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeliveryReceive {

  constructor(public http: HttpClient) {
    console.log('Hello DeliveryReceiveProvider Provider');
    
  }

  

}

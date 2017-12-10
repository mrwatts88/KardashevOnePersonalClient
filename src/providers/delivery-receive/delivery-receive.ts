import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseProvider } from './../../providers/firebase/firebase';

@Injectable()
export class DeliveryReceive {
  constructor(public http: HttpClient) { }
}
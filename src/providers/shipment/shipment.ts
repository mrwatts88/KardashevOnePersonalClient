import { Injectable } from '@angular/core'
import { FirestoreProvider } from '../firestore/firestore'
import { Shipment } from '../../models/shipment'
import { Api } from '../api/api'
import * as firebase from 'firebase'

@Injectable()
export class ShipmentProvider {

  constructor(public firestoreProvider: FirestoreProvider, public api: Api) { }

  initShipment(deliveryObject) {
    return this.api.post('initshipment', deliveryObject)
  }

  getPendingShipments() {
    return this.firestoreProvider.getPendingShipments(firebase.auth().currentUser.uid)
  }

  deletePendingShipment(shipment: Shipment) {
    return this.firestoreProvider.deletePendingShipment(firebase.auth().currentUser.uid, shipment.id)
  }



}

import { ObjectForPayment } from './../client-hall/client-hall.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ClientPaymentService {

  objectForPayment: ObjectForPayment = undefined;
  paymentStatus = false;

  constructor() { }

  setDataForPayment(data) {
    this.objectForPayment = data;
  }

  getDataForPayment() {
    return this.objectForPayment;
  }


}

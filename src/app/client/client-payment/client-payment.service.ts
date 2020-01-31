import { ObjectForPayment } from './../client-hall/client-hall.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ClientPaymentService {

  dataObject: ObjectForPayment = undefined;

  constructor() { }

  setData(data) {
    this.dataObject = data;
  }

  getData() {
    return this.dataObject;
  }
}

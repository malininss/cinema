import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientPaymentService {

  test: any = undefined;

  constructor() { }

  setData(data) {
    this.test = data;
  }

  getData() {
    return this.test;
  }
}

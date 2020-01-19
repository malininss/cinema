import { ClientPaymentService } from './client-payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent implements OnInit {

  dataObject: any;

  constructor(
    private clientPaymentService: ClientPaymentService
    ) {}

  ngOnInit() {
    this.dataObject = this.clientPaymentService.getData();
    console.log(this.dataObject);
  }

}

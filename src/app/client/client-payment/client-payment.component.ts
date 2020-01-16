import { ClientPaymentService } from './client-payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent implements OnInit {

  constructor(
    private clientPaymentService: ClientPaymentService
    ) {}

  ngOnInit() {
    console.log(this.clientPaymentService.getData());
  }

}

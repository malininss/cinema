import { Router } from '@angular/router';
import { ClientPaymentService } from './../client-payment/client-payment.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-client-ticket',
  templateUrl: './client-ticket.component.html',
  styleUrls: ['./client-ticket.component.scss']
})
export class ClientTicketComponent implements OnInit {

  dataObject: any;
  constructor(
    private clientPaymentService: ClientPaymentService,
    private router: Router
    ) {}

  ngOnInit() {
    if (!this.clientPaymentService.getDataForPayment()) {
      this.router.navigate(['/film']);
    }
    this.dataObject = this.clientPaymentService.getDataForPayment();
  }
}

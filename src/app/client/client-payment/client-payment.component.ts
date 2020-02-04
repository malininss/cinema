import { ObjectForPayment } from './../client-hall/client-hall.component';
import { AppApiService } from './../../app-api.service';
import { ClientPaymentService } from './client-payment.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent implements OnInit {

  dataObject: ObjectForPayment;

  constructor(
    private clientPaymentService: ClientPaymentService,
    private appApiService: AppApiService,
    private datePipe: DatePipe,
    private router: Router
    ) {}

  ngOnInit() {
    if (!this.clientPaymentService.getData()) {
      this.router.navigate(['/film']);
    }
    this.dataObject = this.clientPaymentService.getData();
  }

  sendPayment() {
    const hallConfiguration = this.dataObject.hallConfiguration;

    hallConfiguration.forEach(row => {
      row.map(item => {
        if (item.status === 'checked') {
          item.status = 'reserved';
        }
      });
    });

    if (this.dataObject.reservedHallsId) {
      const objToSend = {reservedHallsHall: JSON.stringify(hallConfiguration)};
      this.appApiService.editReservedHall(objToSend, this.dataObject.reservedHallsId)
        .subscribe (response => {
        });
    } else {
      const objectToSend = {
        hallId: this.dataObject.hall.hallId,
        filmId: this.dataObject.film.filmId,
        reservedHallsHall: this.dataObject.hallConfiguration,
        reservedHallsDate: this.datePipe.transform(this.dataObject.timestamp * 1000, 'yyyy-MM-dd HH:mm:ss')
      };

      this.appApiService.createReservedHall(objectToSend)
        .subscribe(response => {
        });
    }
  }
}

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
    if (!this.clientPaymentService.getDataForPayment() ||
        this.clientPaymentService.paymentStatus ) {
      this.router.navigate(['/film']);
    }

    this.dataObject = this.clientPaymentService.getDataForPayment();
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

      // Временно закомментировал
      this.appApiService.createReservedHall(objectToSend)
        .subscribe(response => {
        });
    }

    const orderObj = {
      orderPlaces: this.dataObject.checkedPlaces,
      orderTotalPrice: this.dataObject.totalPrice,
      orderDateOfFilm: this.dataObject.timestamp,
      orderDateOfOrder: Math.floor(+(new Date()) / 1000).toString(),
      orderHallId: this.dataObject.hall.hallId,
      orderFilmId: this.dataObject.film.filmId
    };

    this.appApiService.newOrder(orderObj)
      .subscribe((response: string) => {
        this.router.navigate(['/ticket']);
        this.clientPaymentService.objectForPayment.pathToQr = response;
        this.clientPaymentService.paymentStatus = true;
      });

  }
}

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
    console.log(this.dataObject);

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

    if (this.dataObject.scheduleId) {
      const objToSend = {current_hall: JSON.stringify(hallConfiguration)};

      // console.log(this.dataObject);
      this.appApiService.editSchedule(objToSend, this.dataObject.scheduleId)
        .subscribe (response => {
          console.log(response);
        });
    } else {

      // const date = this.datePipe.transform(this.dataObject.timestamp * 1000, 'yyyy-MM-dd HH:mm:ss');

      // console.log(this.dataObject);

      const objectToSend = {
        hall_id: this.dataObject.hall.hall_id,
        film_id: this.dataObject.film.film_id,
        current_hall: this.dataObject.hallConfiguration,
        datatime: this.datePipe.transform(this.dataObject.timestamp * 1000, 'yyyy-MM-dd HH:mm:ss')
      };

      this.appApiService.createSchedule(objectToSend)
        .subscribe(response => {
          console.log(response);
        });

    }
  }

}

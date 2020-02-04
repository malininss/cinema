import { DatePipe } from '@angular/common';
import { ClientPaymentService } from './../client-payment/client-payment.service';
import { AppApiService, Film, ReservedHalls, Hall } from '../../app-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface ObjectForPayment {
  film: any;
  hall: any;
  timeToStart: string;
  hallConfiguration?: Array<any>;
  checkedPlaces: string[];
  totalPrice: number;
  reservedHallsId: string;
  timestamp: number;
  pathToQr?: string;
}

@Component({
  selector: 'app-client-hall',
  templateUrl: './client-hall.component.html',
  styleUrls: ['./client-hall.component.scss']
})

export class ClientHallComponent implements OnInit {
  hallId: number;
  filmId: number;
  currentTime: any;
  currentReservedHallPlaces: any;
  currentReservedHallId: string;

  zoom = false;

  film: Film = {
    filmId: '',
    filmName: '',
    filmDescription: '',
    filmDuration: '',
    filmCountry: '',
    filmImg: '',
  };

  hallName: string;
  hall: Hall = {
    hallId: '',
    hallName: '',
    hallConfiguration: '',
    hallActivity: '',
    hallChairPrice: '',
    hallVipChairPrice: ''
  };

  objectForSand: ObjectForPayment = {
    film: '',
    hall: '',
    timeToStart: '',
    checkedPlaces: [],
    totalPrice: 0,
    reservedHallsId: '',
    timestamp: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appApiService: AppApiService,
    private clientPaymentService: ClientPaymentService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.hallId = +params.get('hallId');
      this.currentTime = params.get('currentDay');
      this.filmId = +params.get('filmId');
    });
    this.getHall();
    this.getFilm();
  }

  getReservedHallByDateAndHallId() {
    this.appApiService.getReservedHallByDateAndHallId(this.currentTime, this.hallId)
      .subscribe((currentReservedHall: ReservedHalls) => {
        console.log(currentReservedHall);

        this.currentReservedHallId = currentReservedHall.reservedHallsId;

        if (!currentReservedHall) {
          this.currentReservedHallPlaces = JSON.parse(this.hall.hallConfiguration);
        } else {
          currentReservedHall.reservedHallsHall = JSON.parse(currentReservedHall.reservedHallsHall);
          this.currentReservedHallPlaces = currentReservedHall.reservedHallsHall;
        }
      },
      error => {
        console.log(error.message);
      });
  }

  getFilm() {
    this.appApiService.getFilmById(this.filmId)
    .subscribe((film: Film) => {
      this.film = film;
    });
  }

  getHall() {
    this.appApiService.getHallById(this.hallId)
    .subscribe((hall: Hall) => {
      this.hall = hall;
      this.getReservedHallByDateAndHallId();
    });
  }

  changePlaceStatus(rowIndex, placeIndex) {
    const currentElem = this.currentReservedHallPlaces[rowIndex][placeIndex];
    if (currentElem.status === 'free') {
      currentElem.status = 'checked';
    } else if (currentElem.status === 'checked') {
      this.objectForSand.checkedPlaces = [];
      currentElem.status = 'free';
    }
  }

  createObjectForPayment() {
    this.objectForSand.film = this.film;
    this.objectForSand.hall = this.hall;
    this.objectForSand.reservedHallsId = this.currentReservedHallId;
    // Хрень с тысячами. Разобраться!
    this.objectForSand.timeToStart = this.datePipe.transform(this.currentTime * 1000, 'HH:mm');
    this.objectForSand.timestamp = this.currentTime;
    this.objectForSand.hallConfiguration = this.currentReservedHallPlaces;

    let placeCounter = 0;

    for (const currentRow of this.currentReservedHallPlaces) {

      const rowNumber = this.currentReservedHallPlaces.indexOf(currentRow) + 1;
      for (const currentPlace of currentRow) {
        if (currentPlace.type !== 'disabled') {

          placeCounter++;
        } else {
        }
        if (currentPlace.status === 'checked') {
          this.objectForSand.checkedPlaces.push('место ' + placeCounter.toString() + ' / ряд ' + rowNumber);

          if (currentPlace.type === 'simple') {
            this.objectForSand.totalPrice += +this.hall.hallChairPrice;
          } else {
            this.objectForSand.totalPrice += +this.hall.hallVipChairPrice;
          }
        }
      }
    }

    if (this.objectForSand.checkedPlaces.length === 0) {
      const notice: any = document.querySelector('.buying-scheme__notice');
      notice.style.display = 'block';
    } else {
      this.clientPaymentService.setDataForPayment(this.objectForSand);
      this.clientPaymentService.paymentStatus = false;
      this.router.navigate(['/payment']);
    }




  }

  zoomHall() {
    this.zoom = !this.zoom;
  }
}

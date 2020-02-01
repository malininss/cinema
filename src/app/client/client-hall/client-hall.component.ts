import { DatePipe } from '@angular/common';
import { ClientPaymentService } from './../client-payment/client-payment.service';
import { AppApiService, Film, Shcedule, Hall } from '../../app-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface ObjectForPayment {
  film: any;
  hall: any;
  timeToStart: string;
  hallConfiguration?: Array<any>;
  checkedPlaces: string[];
  totalPrice: number;
  scheduleId: string;
  timestamp: number;
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
  currentSchedulePlaces: any;
  currentSchedileId: string;

  zoom = false;

  film: Film = {
    film_id: '',
    film_name: '',
    film_description: '',
    film_duration: '',
    film_country: '',
    film_img: '',
  };

  hallName: string;
  hall: Hall = {
    hall_id: '',
    hall_name: '',
    hall_configuration: '',
    hall_chair_price: '',
    hall_vip_chair_price: ''
  };

  objectForSand: ObjectForPayment = {
    film: '',
    hall: '',
    timeToStart: '',
    checkedPlaces: [],
    totalPrice: 0,
    scheduleId: '',
    timestamp: 0,
  };

  constructor(
    private route: ActivatedRoute,
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

  getScheduleByDateAndHallId() {
    this.appApiService.getScheduleByDateAndHallId(this.currentTime, this.hallId)
      .subscribe((currentSchedule: Shcedule) => {
        this.currentSchedileId = currentSchedule.schedule_id;

        if (!currentSchedule) {
          this.currentSchedulePlaces = JSON.parse(this.hall.hall_configuration);
        } else {
          currentSchedule.current_hall = JSON.parse(currentSchedule.current_hall);
          this.currentSchedulePlaces = currentSchedule.current_hall;
        }
      },
      error => {
        // console.log(error.message);
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
      this.getScheduleByDateAndHallId();
    });
  }

  changePlaceStatus(rowIndex, placeIndex) {
    const currentElem = this.currentSchedulePlaces[rowIndex][placeIndex];
    if (currentElem.status === 'free') {
      currentElem.status = 'checked';
    } else if (currentElem.status === 'checked') {
      currentElem.status = 'free';
    }
  }

  createObjectForPayment() {
    this.objectForSand.film = this.film;
    this.objectForSand.hall = this.hall;
    this.objectForSand.scheduleId = this.currentSchedileId;
    // Хрень с тысячами. Разобраться!
    this.objectForSand.timeToStart = this.datePipe.transform(this.currentTime * 1000, 'HH:mm');
    this.objectForSand.timestamp = this.currentTime;
    this.objectForSand.hallConfiguration = this.currentSchedulePlaces;
    this.currentSchedulePlaces.forEach(row => {
      row.forEach(place => {
        if (place.status === 'checked') {
          this.objectForSand.checkedPlaces.push(place.place);

          if (place.type === 'simple') {
            this.objectForSand.totalPrice += +this.hall.hall_chair_price;
          } else {
            this.objectForSand.totalPrice += +this.hall.hall_vip_chair_price;
          }
        }
      });
    });
    this.clientPaymentService.setData(this.objectForSand);
  }

  zoomHall() {
    this.zoom = !this.zoom;
  }
}

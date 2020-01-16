import { ClientPaymentService } from './../client-payment/client-payment.service';
import { Shcedule, Hall, Film } from './../client-film-list/client-film-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientFilmListService } from '../client-film-list/client-film-list.service';

export interface ObjectForPayment {
  filmName: string;
  plases: string;
  hallName: string;
  timeToStart: string;
  totalPrice: string;
  obj?: object;
}

@Component({
  selector: 'app-client-hall',
  templateUrl: './client-hall.component.html',
  styleUrls: ['./client-hall.component.scss']
})

export class ClientHallComponent implements OnInit {
  objectForSand: ObjectForPayment;

  hallId: number;
  filmId: number;
  currentTime: any;
  currentSchedulePlaces: any;

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

  constructor(
    private route: ActivatedRoute,
    private clientFilmListService: ClientFilmListService,
    private clientPaymentService: ClientPaymentService
  ) { }

  ngOnInit() {

    this.clientPaymentService.setData('test');
    console.log(this.clientPaymentService.getData());

    this.route.paramMap.subscribe(params => {
      this.hallId = +params.get('hallId');
      this.currentTime = params.get('currentDay');
      this.filmId = +params.get('filmId');

    });
    this.getHall();

    this.getScheduleByDateAndHallId();
    this.getFilm();

  }

  getScheduleByDateAndHallId() {
    this.clientFilmListService.getScheduleByDateAndHallId(this.currentTime, this.hallId)
      .subscribe((currentSchedule: Shcedule) => {

        if (!currentSchedule) {
          this.currentSchedulePlaces = JSON.parse(this.hall.hall_configuration);

        } else {
          currentSchedule.current_hall = JSON.parse(currentSchedule.current_hall);
          this.currentSchedulePlaces = currentSchedule.current_hall;
          console.log(this.currentSchedulePlaces);
        }
      },
      error => {
        console.log(error.message);
      });


  }

  getFilm() {
    this.clientFilmListService.getFilmById(this.filmId)
    .subscribe((film: Film) => {
      this.film = film;
    });
  }

  getHall() {
    this.clientFilmListService.getHallById(this.hallId)
    .subscribe((hall: Hall) => {
      this.hall = hall;
    });
  }

  changePlaseStatus(rowIndex, placeIndex) {
    const currentElem = this.currentSchedulePlaces[rowIndex][placeIndex];
    if (currentElem.status === 'free') {
      currentElem.status = 'checked';
    } else if (currentElem.status === 'checked') {
      currentElem.status = 'free';
    }
  }

}

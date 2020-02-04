import { AppApiService, Hall } from './../../app-api.service';
import { Film } from '../../app-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-film-list',
  templateUrl: './client-film-list.component.html',
  providers: [AppApiService],
  styleUrls: ['./client-film-list.component.scss']
})

export class ClientFilmListComponent implements OnInit {
  films: Film[] = [];
  days: any = [new Date()];
  currentDay: any = new Date();
  today: any = new Date();
  prevButton: any = false;
  scheduleList: any;
  currentHallId = 0;
  halls: Hall[] = [];

  constructor(private appApiService: AppApiService) { }

  ngOnInit() {
    this.currentDay.setHours(0, 0, 0, 0);
    this.getFilms();
    this.getHalls();
    this.getDays();
  }

  checkCurrentDay(day: Date) {
    this.currentDay = day;
  }

  getDays(count = 0) {
    this.currentDay.setDate(this.days[0].getDate() + count);

    this.days = [];
    let dayCounterAdder = 0;

    for (let i = 0; i < 6; i++) {
      const day = new Date(this.currentDay);
      day.setDate(day.getDate() + dayCounterAdder);
      this.days.push(day);
      dayCounterAdder++;
    }

    if (this.days[0].getDate() === (new Date()).getDate() &&
        this.days[0].getMonth() === (new Date()).getMonth()) {
      this.prevButton = false;
    } else {
      this.prevButton = true;
    }
  }

  getFilms() {
    this.appApiService.getFilms()
      .subscribe((films: Film[]) => {
        films.forEach(element => {
          element.filmSchedule = JSON.parse(element.filmSchedule);
        });
        this.films = films;
      });
  }

  getReservedHallById(id) {
    this.appApiService.getReservedHallById(id)
    .subscribe(reservedHalls => {
    });
  }

  getReservedDateAndTime(time) {
    const timeArr = time.split(':');
    const reservedDateAndTime = new Date(this.currentDay);
    return reservedDateAndTime.setHours(timeArr[0], timeArr[1]) / 1000;
  }

  checkFilmActivity(film) {
    if (film.filmSchedule && film.filmSchedule.length === 0) {
      return false;
    }

    return !film.filmSchedule.every(item => {
      return !this.checkHallActivity(item.hallId);
    });
  }

  checkHallActivity(hallId) {

    const currentHall = this.halls.filter(item => {
      return item.hallId === hallId;
    })[0];

    if (currentHall) {
      return currentHall.hallActivity === '0' ? false : true;
    }
  }

  getHalls() {
    this.appApiService.getHalls()
      .subscribe(response => {
        this.halls = response;
      });
  }
}

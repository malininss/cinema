import { ClientFilmListService } from './client-film-list.service';
import { Component, OnInit } from '@angular/core';
import { Film } from './client-film-list.service';

@Component({
  selector: 'app-client-film-list',
  templateUrl: './client-film-list.component.html',
  providers: [ClientFilmListService],
  styleUrls: ['./client-film-list.component.scss']
})

export class ClientFilmListComponent implements OnInit {
  films: Film[] = [];
  days: any = [new Date()];
  currentDay: Date = new Date();
  today: Date = new Date();
  prevButton: any = false;
  scheduleList: any;
  currentHallId = 0;

  constructor(private clientFilmListService: ClientFilmListService) { }

  ngOnInit() {
    this.currentDay.setHours(0, 0, 0, 0);

    this.getFilms();
    this.getDays();

    // console.log(this.currentDay);
  }

  checkCurrentDay(day: Date) {
    this.currentDay = day;
    // console.log(this.currentDay);
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

    // Доработать!
    if (this.days[0].getDate() === (new Date()).getDate() &&
        this.days[0].getMonth() === (new Date()).getMonth()) {
      this.prevButton = false;
    } else {
      this.prevButton = true;
    }
  }

  getFilms() {
    this.clientFilmListService.getFilms()
      .subscribe((films: Film[]) => {
        // ПЕРЕДЕЛАТЬ!!
        films.forEach(element => {
          element.film_schedule = JSON.parse(element.film_schedule);
          // console.log(element.film_schedule);
        });
        this.films = films;
      });
  }

  getScheduleById(id) {
    this.clientFilmListService.getScheduleById(id)
    .subscribe(scheduleList => {
    });
  }

  getReservedDateAndTime(scheduleTime) {
    const timeArr = scheduleTime.split(':');
    const reservedDateAndTime = new Date(this.currentDay);
    return reservedDateAndTime.setHours(timeArr[0], timeArr[1]) / 1000; // делением убрали милисекунды
  }

  // getHallNameById(hallId) {
  //   this.clientFilmListService.getHallById(hallId)
  //   .subscribe(hall => {
  //     console.log(hall);
  //   });
  // }

}

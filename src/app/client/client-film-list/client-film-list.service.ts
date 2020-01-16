import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

export interface Film {
  film_id: string;
  film_name: string;
  film_description: string;
  film_duration: string;
  film_country: string;
  film_img: string;
  film_schedule?: string;
}

export interface Shcedule {
  schedule_Id: string;
  hall_id: string;
  current_hall: string;
  datatime: string;
  film_id: string;
}


export interface Hall {
  hall_id: string;
  hall_name: string;
  hall_configuration: string;
  hall_chair_price: string;
  hall_vip_chair_price: string;
}

@Injectable({
  providedIn: 'root'
})

export class ClientFilmListService {
  constructor(private http: HttpClient) { }

  getFilms() {
    const requestUrl = 'http://localhost/api/films/';
    return this.http.get<Film[]>(requestUrl);
  }


  getFilmById(filmId) {
    const requestUrl = 'http://localhost/api/films/' + filmId;
    return this.http.get<Film>(requestUrl);
  }

  getScheduleById(id) {
    const requestUrl = 'http://localhost/api/schedule/' + id;
    return this.http.get<Shcedule>(requestUrl);
  }

  getScheduleByDateAndHallId(date, hallId) {
    const requestUrl = 'http://localhost/api/schedule/' + hallId + '/' + date;
    return this.http.get(requestUrl);
  }

  getHallById(hallId): Observable<any> {
    const requestUrl = 'http://localhost/api/halls/' + hallId;
    return this.http.get<Hall>(requestUrl);
  }
}

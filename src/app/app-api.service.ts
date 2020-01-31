import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export interface Film {
  film_id: string;
  film_name: string;
  film_description: string;
  film_duration: string;
  film_country: string;
  film_img: string;
  film_schedule?: any;
}

export interface Shcedule {
  schedule_id: string;
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

export class AppApiService {
  apiUrl = 'http://localhost/api';


  constructor(private http: HttpClient) { }

  getFilms() {
    const requestUrl = this.apiUrl + '/films/';
    return this.http.get<Film[]>(requestUrl);
  }

  getFilmById(filmId) {
    const requestUrl = this.apiUrl + '/films/' + filmId;
    return this.http.get<Film>(requestUrl);
  }

  getScheduleById(id) {
    const requestUrl = this.apiUrl + '/schedule/' + id;
    return this.http.get<Shcedule>(requestUrl);
  }


  editSchedule(updateObj, scneduleId) {
    const requestUrl = this.apiUrl + '/schedule/' + scneduleId + '/PUT';
    return this.http.post(requestUrl, updateObj);
  }

  getScheduleByDateAndHallId(date, hallId) {
    console.log(date);
    const requestUrl = this.apiUrl + '/schedule/' + hallId + '/' + date;
    return this.http.get(requestUrl);
  }

  createSchedule(dataObj) {
    const requestUrl = this.apiUrl + '/schedule/';
    return this.http.post(requestUrl, dataObj);
  }

  getHallById(hallId) {
    const requestUrl = this.apiUrl + '/halls/' + hallId;
    return this.http.get<Hall>(requestUrl);
  }

  getHalls() {
    const requestUrl = this.apiUrl + '/halls/';
    return this.http.get<Hall[]>(requestUrl);
  }

  newHall(hall) {
    const requestUrl = this.apiUrl + '/halls';
    return this.http.post(requestUrl, hall);
  }

  deleteHall(hallId) {
    const requestUrl = this.apiUrl + '/halls/' + hallId + '/DELETE';
    return this.http.post(requestUrl, {});
  }

  editHall(updateObj, hallId) {
    const requestUrl = this.apiUrl + '/halls/' + hallId + '/PUT';
    return this.http.post(requestUrl, updateObj);
  }

  newFilm(filmObj) {
    const requestUrl = this.apiUrl + '/films';
    return this.http.post(requestUrl, filmObj);
  }

  updateFilm(updateObj, filmId) {
    const requestUrl = this.apiUrl + '/films/' + filmId + '/PUT';
    return this.http.post(requestUrl, updateObj);
  }
}

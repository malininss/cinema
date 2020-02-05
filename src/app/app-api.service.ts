import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Film {
  filmId: string;
  filmName: string;
  filmDescription: string;
  filmDuration: string;
  filmCountry: string;
  filmImg: string;
  filmSchedule?: any;
}

export interface ReservedHalls {
  reservedHallsId: string;
  hallId: string;
  reservedHallsHall: string;
  reservedHallsDate: string;
  filmId: string;
}


export interface Hall {
  hallId: string;
  hallName: string;
  hallActivity: string;
  hallConfiguration: string;
  hallChairPrice: string;
  hallVipChairPrice: string;
}

@Injectable({
  providedIn: 'root'
})

export class AppApiService {
  apiUrl = 'http://para-z.com/';


  constructor(private http: HttpClient) { }

  getFilms() {
    const requestUrl = this.apiUrl + 'api/films/';
    return this.http.get<Film[]>(requestUrl);
  }

  getFilmById(filmId) {
    const requestUrl = this.apiUrl + 'api/films/' + filmId;
    return this.http.get<Film>(requestUrl);
  }

  deleteFilmById(filmId) {
    const requestUrl = this.apiUrl + 'api/films/' + filmId + '/DELETE';
    return this.http.post(requestUrl, {});
  }

  getReservedHallById(id) {
    const requestUrl = this.apiUrl + 'api/reservedhalls/' + id;
    return this.http.get<ReservedHalls>(requestUrl);
  }


  editReservedHall(updateObj, scneduleId) {
    const requestUrl = this.apiUrl + 'api/reservedhalls/' + scneduleId + '/PUT';
    return this.http.post(requestUrl, updateObj);
  }

  getReservedHallByDateAndHallId(date, hallId) {
    const requestUrl = this.apiUrl + 'api/reservedhalls/' + hallId + '/' + date;
    return this.http.get(requestUrl);
  }

  createReservedHall(dataObj) {
    const requestUrl = this.apiUrl + 'api/reservedhalls/';
    return this.http.post(requestUrl, dataObj);
  }

  getHallById(hallId) {
    const requestUrl = this.apiUrl + 'api/halls/' + hallId;
    return this.http.get<Hall>(requestUrl);
  }

  getHalls() {
    const requestUrl = this.apiUrl + 'api/halls/';
    return this.http.get<Hall[]>(requestUrl);
  }

  newHall(hall) {
    const requestUrl = this.apiUrl + 'api/halls';
    return this.http.post(requestUrl, hall);
  }

  deleteHall(hallId) {
    const requestUrl = this.apiUrl + 'api/halls/' + hallId + '/DELETE';
    return this.http.post(requestUrl, {});
  }

  editHall(updateObj, hallId) {
    const requestUrl = this.apiUrl + 'api/halls/' + hallId + '/PUT';
    return this.http.post(requestUrl, updateObj);
  }

  newFilm(filmObj) {
    const requestUrl = this.apiUrl + 'api/films';
    return this.http.post(requestUrl, this.toFormData(filmObj));
  }

  updateFilm(updateObj, filmId) {
    const requestUrl = this.apiUrl + 'api/films/' + filmId + '/PUT';
    return this.http.post(requestUrl, updateObj);
  }

  newOrder(orderObj) {
    const requestUrl = this.apiUrl + 'api/orders';
    return this.http.post(requestUrl, orderObj);
  }

  toFormData(object) {
    const formData = new FormData();

    for ( const key of Object.keys(object) ) {
      const value = object[key];
      formData.append(key, value);
    }
    return formData;
  }

}

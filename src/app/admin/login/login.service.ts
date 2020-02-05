import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://para-z.com/';

  constructor(private http: HttpClient) { }

  login(loginObj) {
    const requestUrl = this.apiUrl + 'api/login.php';
    return this.http.post(requestUrl, this.toFormData(loginObj));
  }

  toFormData(object) {
    const formData = new FormData();

    for ( const key of Object.keys(object) ) {
      const value = object[key];
      formData.append(key, value);
    }
    return formData;
  }

  getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}

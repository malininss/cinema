import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-film-list',
  templateUrl: './client-film-list.component.html',
  styleUrls: ['./client-film-list.component.scss']
})
export class ClientFilmListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const xhr = new XMLHttpRequest(); // у конструктора нет аргументовx

    xhr.open('POST', 'http://localhost/api/films');
    const formData = new FormData();

    formData.append('film_name', 'тестовое название1112');
    formData.append('film_description', 'тестовое описание');
    formData.append('film_duration', '150');
    formData.append('film_country', 'россия');
    formData.append('film_img', 'картинка');

    xhr.send(formData);

  }

}

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

    xhr.open('POST', 'http://localhost/api/halls/3/');
    // const formData = new FormData();

    // formData.append('hall_name', 'Зал 11111');
    // formData.append('hall_chair_price', '100');
    // formData.append('hall_vip_chair_price', '200');

    xhr.send();


  }

}

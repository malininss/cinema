import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-film-list',
  templateUrl: './client-film-list.component.html',
  styleUrls: ['./client-film-list.component.scss']
})
export class ClientFilmListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let xhr = new XMLHttpRequest(); // у конструктора нет аргументовx
    xhr.open('GET', 'http://localhost/actions/get-films.php')
    xhr.send();

    xhr.onload = function() {
      if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
      } else { // если всё прошло гладко, выводим результат
        alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
      }
    };

    xhr.onprogress = function(event) {
      if (event.lengthComputable) {
        alert(`Получено ${event.loaded} из ${event.total} байт`);
      } else {
        alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
      }

    };

    xhr.onerror = function() {
      alert("Запрос не удался");
    };



  }

}

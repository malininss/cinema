import { AppApiService, Hall, Film } from './../../app-api.service';
import { Component, OnInit } from '@angular/core';
import { Scheduler } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  halls: Hall[] = [
    {
      hall_id: '',
      hall_name: '',
      hall_vip_chair_price: '',
      hall_chair_price: '',
      hall_configuration: ''
    }
  ];

  films: Film[] = [];

  hallTimeLine: any = [];

  visibleCreateHallPopup = false;
  visibleDeleteHallPopup = false;
  visibleCreateFilmPopup = false;

  newHallName = '';
  indexOfSelectedHall = 0;

  activeHall: number;
  activeHallRowNumber: number;
  activeHallPlacesNumber: number;

  currentRow: any = 0;
  currentPlace: any = 0;

  currentStandartPrice: any = 0;
  currentVipPrice: any = 0;
  hallToDelete: any = '';

  newFilmName: any;
  newFilmDescriprion: any;
  newFilmDuration: any;
  newFilmCountry: any;


  constructor(
    private appApiService: AppApiService
  ) { }

  ngOnInit() {
    this.getHalls();
    this.getHallTimeLine();
    this.getFilms();
    // this.getMinuteFromMidnight('09:00');
  }

  createHall() {

    const obj = {
      hall_name: this.newHallName
    };

    this.appApiService.newHall(obj)
    .subscribe(data => {
      this.getHalls();
      this.closeCreateHallPopup();
      this.newHallName = '';
    });

  }

  deleteHall() {
    this.appApiService.deleteHall(this.hallToDelete.hall_id)
    .subscribe(data => {
      this.getHalls();
      this.closeDeleteHallPopup();
      this.hallToDelete = '';
    });
  }

  getHalls() {
    this.appApiService.getHalls()
    .subscribe((halls: Hall[]) => {
      halls.forEach(item => {
        item.hall_configuration = JSON.parse(item.hall_configuration);
      });

      // Устанавливаем количество мест и рядов для блока конфигурации зала
      this.currentRow = halls[this.indexOfSelectedHall].hall_configuration.length;
      this.currentPlace = halls[this.indexOfSelectedHall].hall_configuration[0].length;

      this.currentStandartPrice = halls[this.indexOfSelectedHall].hall_chair_price;
      this.currentVipPrice = halls[this.indexOfSelectedHall].hall_vip_chair_price;

      this.halls = halls;
    });
  }

  showDeleteHallPopup(hall) {
    this.hallToDelete = hall;
    this.visibleDeleteHallPopup = true;
  }

  showCreateHallPopup() {
    this.visibleCreateHallPopup = true;
  }

  showCreateFilmPopup() {
    this.visibleCreateFilmPopup = true;
  }

  closeCreateHallPopup() {
    this.hallToDelete = '';
    this.visibleCreateHallPopup = false;
  }

  closeDeleteHallPopup() {
    this.visibleDeleteHallPopup = false;
  }

  closeCreateFilmPopup() {
    this.visibleCreateFilmPopup = false;
  }

  setActiveHallIndex(index) {
    this.indexOfSelectedHall = index;

    // Устанавливаем количество мест и рядов для блока конфигурации зала
    this.currentRow = this.halls[this.indexOfSelectedHall].hall_configuration.length;
    this.currentPlace = this.halls[this.indexOfSelectedHall].hall_configuration[0].length;

    this.currentStandartPrice = this.halls[this.indexOfSelectedHall].hall_chair_price;
    this.currentVipPrice = this.halls[this.indexOfSelectedHall].hall_vip_chair_price;
  }

  editHallConf(rows, places) {

    const testHall: any = this.halls[this.indexOfSelectedHall].hall_configuration;

    // Если нужно добавить места
    if (places > testHall[0].length) {

      for (const i of testHall) {
        const currentLength = i.length;

        for (let j = 0; j < (places - currentLength); j++ ) {
          i.push({
            status: 'free',
            type: 'simple'
          });
        }
      }
    }

    // Если нужно обрезать места (везде)
    if (places < testHall[0].length) {
      console.log('Убираем места');

      const placesForSubtraction = places - testHall[0].length;
      for (let i = 0; i < testHall.length; i++) {
        testHall[i] = testHall[i].slice(0, placesForSubtraction);
      }
    }

    // Конфигурируем ряды

    let rowToAdd = 0;

    // Считаем количество рядов для добавления / удаления
    rowToAdd = rows - (testHall.length);

    if (rowToAdd < 0) {
      // Тут надо удалить ряды, просто обрезаем
      this.halls[this.indexOfSelectedHall].hall_configuration = testHall.slice(0, rowToAdd);
    }

    if (rowToAdd > 0) {
      // Тут надо добавить ряды, проходимсся циклом и пушим
      for (let i = 0; i < rowToAdd; i++ ) {

        const arrayToPush = [];

        for (let j = 0; j < places; j++ ) {
          arrayToPush.push({
            status: 'free',
            type: 'simple'
          });
        }

        testHall.push(arrayToPush);
      }
    }
  }

  canselChanges() {
    this.getHalls();
  }

  submitHallConfiguration() {
    console.log('Здесь мы должны отправить put-запрос на изменение каждого холла? Или только изменнного? Подумать', this.halls);
  }

  changePlaceType(place) {
    const statuses = ['disabled', 'simple', 'vip'];
    if (statuses.indexOf(place) === statuses.length) {
      place.status = statuses[0];
    } else {
      place.status = statuses[statuses.indexOf(place.status) + 1];
    }
  }

  saveHallPrice() {
    this.halls[this.indexOfSelectedHall].hall_chair_price = this.currentStandartPrice;
    this.halls[this.indexOfSelectedHall].hall_vip_chair_price = this.currentVipPrice;
  }

  submitPriceConfiguration() {
    console.log(this.halls);
  }


  // Получаем массив для ленты с фильмами!
  getHallTimeLine() {
    this.appApiService.getFilms()
    .subscribe((films: Film[]) => {

      const hallLineObj = {};

      films.forEach(film => {
        film.film_schedule = JSON.parse(film.film_schedule);

        if (film.film_schedule) {
          film.film_schedule.forEach(schedule => {

            const timeObj = {};

            schedule.time.forEach(time => {
              timeObj[time] = film.film_id;
            });

            if (hallLineObj[schedule.hallName]) {

              /// Проверки здесь нет. Но, может, и не нужна?
              hallLineObj[schedule.hallName] = {...hallLineObj[schedule.hallName], ...timeObj};


              // console.log('Зал уже был добален, нужна проверка!');
            } else {
              hallLineObj[schedule.hallName] = timeObj;

              // console.log('Добавляем зал первый раз');
            }
          });
        }
      });

      // console.log(hallLineObj);
      this.hallTimeLine = hallLineObj;

      console.log(this.hallTimeLine);
      // Object.assign(this.hallTimeLine, hallLineObj);
      // this.test.push(hallLineObj);


    });
  }

  getFilms() {
    this.appApiService.getFilms()
      .subscribe((films: Film[]) => {
        films.forEach((element, index) => {
          element.film_schedule = JSON.parse(element.film_schedule);
        });
        this.films = films;
      });
  }

  getFilmById(id): Film {

    let result: Film = {
      film_id: '',
      film_name: '',
      film_description: '',
      film_duration: '',
      film_country: '',
      film_img: '',
    };

    this.films.forEach(item => {
      if (+item.film_id === +id) {
        result = item;
      }
    });
    return result;

  }

  getLeftPosition(time): string {

    const positionPerOneMinute = 0.5;
    const timeArr = time.split(':');
    const minutes = (+timeArr[0] * 60) + +timeArr[1];

    return minutes * positionPerOneMinute + 'px';
  }

  getWidth(filmDuration) {
    const widthPerOneMinute = 0.5;
    return filmDuration * widthPerOneMinute + 'px';
  }

  createFilm() {
    const obj = {
      film_name: this.newFilmName,
      film_description: this.newFilmDescriprion,
      film_duration: this.newFilmDuration,
      film_country: this.newFilmCountry,
      film_img: '..\/assets\/i\/poster1.jpg'
    };


    if (obj.film_name &&
        obj.film_description &&
        obj.film_duration &&
        obj.film_country &&
        obj.film_img ) {

      this.appApiService.newFilm(obj)
      .subscribe(data => {
        this.newFilmName = '';
        this.newFilmDescriprion = '';
        this.newFilmDuration = '';
        this.newFilmCountry = '';

        this.closeCreateFilmPopup();
        this.getFilms();
      });

    }
  }

}


import { AppApiService, Hall, Film } from './../../app-api.service';
import { Component, OnInit } from '@angular/core';
import { Scheduler } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  addShowtimeFormGroup: FormGroup;
  addHallFormGroup: FormGroup;
  deleteHallFormGroup: FormGroup;
  hallToDelete: any = '';


  visibleCreateHallPopup = false;
  visibleDeleteHallPopup = false;
  visibleCreateFilmPopup = false;
  visibleShowtimeAddPopup = false;

  indexOfSelectedHall = 0;
  activeHall: number;
  activeHallRowNumber: number;
  activeHallPlacesNumber: number;

  currentRow: any = 0;
  currentPlace: any = 0;

  currentStandartPrice: any = 0;
  currentVipPrice: any = 0;

  newFilmName: any;
  newFilmDescriprion: any;
  newFilmDuration: any;
  newFilmCountry: any;

  addShowtimeFilmId: any;
  addShowtimeCurrentFilmTime = '00:00';
  addShowtimeHall: any;

  constructor(
    private appApiService: AppApiService
  ) { }

  ngOnInit() {
    this.getHalls();
    this.getHallTimeLine();
    this.getFilms();

    this.addShowtimeFormGroup = new FormGroup({
      hallId: new FormControl('', Validators.required),
      time: new FormControl('00:00')
    });

    this.addHallFormGroup = new FormGroup({
      hallName: new FormControl('')
    });

    this.deleteHallFormGroup = new FormGroup({
      hallId: new FormControl(null)
    });
  }

  createHall() {

    const formdata = {...this.addHallFormGroup.value};
    const objToSend = {
      hall_name: formdata.hallName
    };

    this.appApiService.newHall(objToSend)
    .subscribe(data => {
      this.getHalls();
      this.closeCreateHallPopup();
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
      console.log(this.halls);
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

  showShowtimeAddPopup(filmId) {
    this.addShowtimeFilmId = filmId;
    this.visibleShowtimeAddPopup = true;
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

  closeShowtimeAddPopup() {
    this.visibleShowtimeAddPopup = false;
    const notice = document.querySelector('.conf-step_notice');
    notice.innerHTML = '';
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

            if (hallLineObj[schedule.hallId]) {
              hallLineObj[schedule.hallId] = {...hallLineObj[schedule.hallId], ...timeObj};
            } else {
              hallLineObj[schedule.hallId] = timeObj;
            }
          });
        }
      });
      this.hallTimeLine = hallLineObj;
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

  checkSessionTime(hallId, currentTime) {

    // Время нового фильма и длительность. Далее добавлять в конструкторе
    // const currentTime =  this.addShowtimeCurrentFilmTime;

    // const currentTime = '00:00';
    // console.log(currentTime);

    const currentFilmDuration = +(this.getFilmById(this.addShowtimeFilmId).film_duration);

    // Преобразуем время из строки в количество минут, прошедших с полуночи
    const minutesFromMidnight = (time) => {
      const arr = time.split(':');
      return  (+arr[0] * 60) + +arr[1];
    };

    // Получаем количество пинут нового фильма, прошедших с полуноси
    const currentTimeDate = minutesFromMidnight(currentTime);

    for (const hall in this.hallTimeLine) {
      if (hall) {

        // Проверяем для совпадение зала по имени. Далее сделать автоматом
        if (hall === hallId) {

          // Здесь преваращаем объект в массив и второе значение (ID фильма) превращаем в длительности фильма
          let timeArr = Object.entries(this.hallTimeLine[hall]);
          timeArr = timeArr.map(elem => {
            const film = this.getFilmById(elem[1]);
            const filmDuration = film.film_duration;
            elem[1] = filmDuration;
            return [elem[0], elem[1]];
          });

          // Идём по полученному массиву
          for (let i = 0; i < timeArr.length; i++) {

            // Определяем дату старта и дату окончания фильма
            const timeStartFilm = minutesFromMidnight(timeArr[i][0]);
            const timeEndFilm = timeStartFilm + +timeArr[i][1];

            // Если совпадение по дате есть, выкидываем ошибку
            if ( currentTimeDate >= timeStartFilm &&
                currentTimeDate < timeEndFilm
            ) {

              const notice = document.querySelector('.conf-step_notice');
              notice.innerHTML = `
                Время сеанса совпадает со временем уже идущего фильма.<br>
                Время старта фильма, с которым происходит конфликт: ${timeArr[i][0]} <br>
                Название зала: ${hall}
              `;

              console.log('Время сопадения: ' + timeArr[i][0]);
              console.log('Зал: ' + hall);

              return false;
            }

            // Проверяем, есть ли следующее значение
            if (timeArr[i + 1]) {

              // Если значение есть, получаем количество минут, прошедших с полуночи у этого значения.
              const nextFilmMinutesFromMidnight = minutesFromMidnight(timeArr[i + 1][0]);

              // Если новый фильм наачинаетс, пока старые ещё идёт, выкидываем ошибку
              if ( nextFilmMinutesFromMidnight > currentTimeDate &&
                   currentTimeDate + currentFilmDuration > nextFilmMinutesFromMidnight
              ) {

                const notice = document.querySelector('.conf-step_notice');
                notice.innerHTML = `
                  Время добавленного сеанса наезжает на следующий сеанса.<br>
                  Время старта фильма, с которым происходит конфликт: ${timeArr[i + 1][0]} <br>
                  Название зала: ${hall}
                `;

                console.log('Время добавленного сеанса наезжает на следующий сеанс');
                console.log('Время старта фильма, с которым происходит конфликт: ' + timeArr[i + 1][0]);
                console.log('Название зала: ' + hall);

                return false;
              }
            }
          }
        }
      }
    }
    return true;
  }

  createTimelineElem() {
    const formData = { ...this.addShowtimeFormGroup.value };

    if (this.checkSessionTime(formData.hallId, formData.time)) {
      const filmSchedule = this.getFilmById(this.addShowtimeFilmId).film_schedule;
      let arrToSend = [];

      if (filmSchedule) {

        const currentHall = filmSchedule.filter(item => {
          return item.hallId === formData.hallId;
        });

        if (currentHall.length === 1) {
          arrToSend = filmSchedule.map(item => {
            if (item.hallId === formData.hallId) {
              item.time.push(formData.time);
            } else {

            }
            return item;
          });

        } else {
          const hallName = this.halls.filter(item => {
            return item.hall_id === formData.hallId;
          })[0].hall_name;

          arrToSend = filmSchedule.slice();

          arrToSend.push({
            hallId: formData.hallId,
            hallName,
            time: [formData.time]
          });
        }

      } else {

        const hallName = this.getHallNameById(formData.hallId);
        arrToSend = [
          {
            hallId: formData.hallId,
            hallName,
            time: [formData.time]
          }
        ];
      }

      this.appApiService.updateFilm(JSON.stringify({film_schedule: arrToSend}), this.addShowtimeFilmId)
        .subscribe(response => {
          this.closeShowtimeAddPopup();
          this.getHallTimeLine();
        });

    } else {
      return false;
    }

  }

  getHallNameById(id) {
    const hall: Hall = this.halls.filter(item => {
      return item.hall_id === id;
    })[0];

    if (hall) {
      return hall.hall_name;
    }
  }
}


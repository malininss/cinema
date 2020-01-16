<?php
require_once('Api.php');
require_once('Connection.php');
require_once('Schedule.php');

class ScheduleApi extends Api {

  public $apiName = 'schedule';

  /**
   * Метод GET
   * Вывод списка всех записей
   * http://ДОМЕН/schedule
   * @return string
   */
  public function indexAction() {
    $db = (new Connection())->getConnection();
    $allScheduleElements = Schedule::getAll($db);
    if($allScheduleElements){
        return $this->response($allScheduleElements, 200);
    }
    return $this->response('Data not found', 404);
  }


  /**
   * Метод GET
   * Просмотр отдельной записи (по id)
   * http://ДОМЕН/schedule/1
   * @return string
   */
  public function viewAction() {
    //id должен быть первым параметром после /films/
    $id = array_shift($this->requestUri);
    $db = (new Connection())->getConnection();

    if (count($this->requestUri) !== 0) {
      $timestamp = parse_url($this->requestUri[0])['path'];
      $currentSchedule = Schedule::getByIdAndTimestamp($db, $id, $timestamp); // Привет 1580202000, id 7
      if($currentSchedule){
        return $this->response($currentSchedule, 200);
      } else {
        return $this->response("", 200);
      }


    } else {
        if($id){
          $currentSchedule = Schedule::getById($db, $id);
          if($currentSchedule){
            return $this->response($currentSchedule, 200);
          }
        }
    }

    return $this->response('Data not found', 404);
  }


  /**
   * Метод POST
   * Создание новой записи
   * http://ДОМЕН/api/schedule
   * Отправлять параметры запроса: hall_id, current_hall (json), datatime (формат 2020-01-08 00:00:00), film_id
   * @return string
   */
  public function createAction() {
    $db = (new Connection())->getConnection();

    if(Schedule::createScheduleElement($db, $this->requestParams)){
      return $this->response('Data saved.', 200);
    }
    return $this->response("Saving error", 500);
  }


  /**
   * Метод POST
   * Обновление отдельной записи (по ее id)
   * http://ДОМЕН/api/schedule/1/PUT
   * Отправлять параметры обновления: hall_id, current_hall (json), datatime (формат 2020-01-08 00:00:00), film_id
   * @return string
   */
  public function updateAction() {

    $parse_url = parse_url($this->requestUri[0]);
    $scheduleId = $parse_url['path'] ?? null;

    $db = (new Connection())->getConnection();

    if(!$scheduleId || !Schedule::getById($db, $scheduleId)){
      return $this->response("Hall with id=$hallId not found", 404);
    }

    if($this->requestParams){
      if($schedule = Schedule::updateScheduleElement($db, $scheduleId, $this->requestParams)){
        return $this->response('Data updated.', 200);
      }
    }
    return $this->response("Update error", 400);
  }


  /**
   * Метод DELETE
   * Удаление отдельной записи (по ее id)
   * http://ДОМЕН/users/schedule/1/DELETE
   * @return string
   */
  public function deleteAction() {

    $parse_url = parse_url($this->requestUri[0]);
    $scheduleId = $parse_url['path'] ?? null;

    $db = (new Connection())->getConnection();

    if(!$scheduleId || !Schedule::getById($db, $scheduleId)){
      return $this->response("User with id=$scheduleId not found", 404);
    }

    if(Schedule::deleteById($db, $scheduleId)){
      return $this->response('Data deleted.', 200);
    }
    return $this->response("Delete error", 500);
  }
}

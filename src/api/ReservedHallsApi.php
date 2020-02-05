<?php
require_once('Api.php');
require_once('Connection.php');
require_once('ReservedHalls.php');

class ReservedHallsApi extends Api {

  public $apiName = 'reservedhalls';

  /**
   * Метод GET
   * Вывод списка всех записей
   * http://ДОМЕН/reservedhalls
   * @return string
   */
  public function indexAction() {
    $db = (new Connection())->getConnection();
    $allReservedHallsElements = ReservedHalls::getAll($db);
    if($allReservedHallsElements){
        return $this->response($allReservedHallsElements, 200);
    }
    return $this->response('Data not found', 404);
  }


  /**
   * Метод GET
   * Просмотр отдельной записи (по id)
   * http://ДОМЕН/reservedhalls/1
   * @return string
   */
  public function viewAction() {
    $id = array_shift($this->requestUri);
    $db = (new Connection())->getConnection();

    if (count($this->requestUri) !== 0) {
      $timestamp = parse_url($this->requestUri[0])['path'];
      $currentReservedHall = ReservedHalls::getByIdAndTimestamp($db, $id, $timestamp); // Привет 1580202000, id 7
      if($currentReservedHall){
        return $this->response($currentReservedHall, 200);
      } else {
        return $this->response("", 200);
      }


    } else {
        if($id){
          $currentReservedHall = ReservedHalls::getById($db, $id);
          if($currentReservedHall){
            return $this->response($currentReservedHall, 200);
          }
        }
    }

    return $this->response('Data not found', 404);
  }


  /**
   * Метод POST
   * Создание новой записи
   * http://ДОМЕН/api/reservedhalls
   * Отправлять параметры запроса: hall_id, current_hall (json), datatime (формат 2020-01-08 00:00:00), film_id
   * @return string
   */
  public function createAction() {
    $db = (new Connection())->getConnection();

    $params = json_decode($this->requestParams,true);
    $params['reservedHallsHall'] = json_encode($params['reservedHallsHall']);

    if(ReservedHalls::createReservedHallsElement($db, $params)){
      return $this->response('Data saved.', 200);
    }
    return $this->response("Saving error", 500);
  }


  /**
   * Метод POST
   * Обновление отдельной записи (по ее id)
   * http://ДОМЕН/api/reservedhalls/1/PUT
   * Отправлять параметры обновления: hall_id, current_hall (json), datatime (формат 2020-01-08 00:00:00), film_id
   * @return string
   */
  public function updateAction() {

    $parse_url = parse_url($this->requestUri[0]);
    $reservedHallId = $parse_url['path'] ?? null;
    $params = json_decode($this->requestParams,true);
    $params['reservedHallsHall'] = json_encode($params['reservedHallsHall']);

    $db = (new Connection())->getConnection();

    if(!$reservedHallId || !ReservedHalls::getById($db, $reservedHallId)){
      return $this->response("Hall with id=$hallId not found", 404);
    }

    if($params){
      if($reservedHallId = ReservedHalls::updateReservedHallsElement($db, $reservedHallId, $params)){
        return $this->response('Data updated.', 200);
      }
    }
    return $this->response("Update error", 400);
  }


  /**
   * Метод DELETE
   * Удаление отдельной записи (по ее id)
   * http://ДОМЕН/users/reservedhalls/1/DELETE
   * @return string
   */
  public function deleteAction() {

    $parse_url = parse_url($this->requestUri[0]);
    $reservedHallId = $parse_url['path'] ?? null;

    $db = (new Connection())->getConnection();

    if(!$reservedHallId || !ReservedHalls::getById($db, $reservedHallId)){
      return $this->response("User with id=$reservedHallId not found", 404);
    }

    if(ReservedHalls::deleteById($db, $reservedHallId)){
      return $this->response('Data deleted.', 200);
    }
    return $this->response("Delete error", 500);
  }
}

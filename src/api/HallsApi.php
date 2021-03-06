<?php
require_once('Api.php');
require_once('Connection.php');
require_once('Halls.php');

class HallsApi extends Api {

  public $apiName = 'halls';

  /**
   * Метод GET
   * Вывод списка всех записей
   * http://ДОМЕН/api/halls
   * @return string
   */
  public function indexAction() {
    $db = (new Connection())->getConnection();
    $halls = Halls::getAll($db);
    if($halls){
      return $this->response($halls, 200);
    }
    return $this->response('Data not found', 404);
  }

  /**
   * Метод GET
   * Просмотр отдельной записи (по id)
   * http://ДОМЕН/halls/1
   * @return string
   */
  public function viewAction() {

    //id должен быть первым параметром после /halls/
    $id = array_shift($this->requestUri);

    if($id){
      $db = (new Connection())->getConnection();
      $hall = Halls::getById($db, $id);
      if($hall){
          return $this->response($hall, 200);
      }
    }
    return $this->response('Data not found', 404);
  }


  /**
   * Метод POST
   * Создание новой записи
   * http://ДОМЕН/api/halls
   * Отправлять параметры запроса: hallName, hallConfiguration, hallChairPrice, hallVipChairPrice
   * @return string
   */
  public function createAction() {
    $db = (new Connection())->getConnection();

    $params = json_decode($this->requestParams,true);

    if($params){
      if (!array_key_exists('hallConfiguration', $params)) {
        $params['hallConfiguration'] = file_get_contents('standart-hall-configuration.json');
      }

      if(Halls::createHall($db, $params)){
        return $this->response('Data saved.', 200);
      }

      return $this->response("Create error", 500);

    }
  }


  /**
   * Метод POST
   * Обновление отдельной записи (по ее id)
   * http://ДОМЕН/api/halls/1/PUT
   * Отправлять параметры обновления: hallName, hallConfiguration, hallChairPrice, hallVipChairPrice
   * @return string
   */
  public function updateAction() {

    $parse_url = parse_url($this->requestUri[0]);
    $hallId = $parse_url['path'] ?? null;
    $params = json_decode($this->requestParams,true);

    if (isset($params['hallConfiguration'])) {
      $params['hallConfiguration'] = json_encode($params['hallConfiguration']);
    }

    $db = (new Connection())->getConnection();

    if(!$hallId || !Halls::getById($db, $hallId)){
      return $this->response("Hall with id=$hallId not found", 404);
    }

    if($this->requestParams){
      if($hall = Halls::updateHall($db, $hallId, $params)){
        return $this->response('Data updated.', 200);
      }
    }
    return $this->response("Update error", 400);
  }


  /**
   * Метод POST
   * Удаление отдельной записи (по ее id)
   * http://ДОМЕН/api/halls/1/DELETE
   * @return string
   */
  public function deleteAction() {

    $parse_url = parse_url($this->requestUri[0]);
    $hallId = $parse_url['path'] ?? null;

    $db = (new Connection())->getConnection();

    if(!$hallId || !Halls::getById($db, $hallId)){
      return $this->response("User with id=$hallId not found", 404);
    }


    if(Halls::deleteById($db, $hallId)){
      return $this->response('Data deleted.', 200);
    }
    return $this->response("Delete error", 500);
  }

}

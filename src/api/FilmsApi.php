<?php
require_once('Api.php');
require_once('Connection.php');
require_once('Films.php');

class FilmsApi extends Api {

  public $apiName = 'films';

  /**
   * Метод GET
   * Вывод списка всех записей
   * http://ДОМЕН/api/films
   * @return string
   */
  public function indexAction() {
    $db = (new Connection())->getConnection();
    $films = Films::getAll($db);
    if($films){
      return $this->response($films, 200);
    }
    return $this->response('Data not found', 404);
  }


  /**
   * Метод GET
   * Просмотр отдельной записи (по id)
   * http://ДОМЕН/films/1
   * @return string
   */
  public function viewAction() {
    //id должен быть первым параметром после /films/
    $id = array_shift($this->requestUri);

    if($id){
      $db = (new Connection())->getConnection();
      $film = Films::getById($db, $id);
      if($film){
        return $this->response($film, 200);
      }
    }
    return $this->response('Data not found', 404);
  }


  /**
   * Метод POST
   * Создание новой записи
   * http://ДОМЕН/api/films.
   * Отправлять параметры запроса: film_name, film_description, film_duration, film_country, film_img
   * @return string
   */
  public function createAction() {
    $db = (new Connection())->getConnection();

    if($this->requestParams){
      if(Films::createFilm($db, $this->requestParams)){
        return $this->response('Data saved.', 200);
      }
    }
    return $this->response("Saving error", 500);
  }


  /**
   * Метод POST
   * Обновление отдельной записи (по ее id)
   * http://ДОМЕН/api/films/1/PUT
   * Отправлять параметры обновления: film_name, film_description, film_duration, film_country, film_img
   * @return string
   */
  public function updateAction() {

    $parse_url = parse_url($this->requestUri[0]);
    $filmId = $parse_url['path'] ?? null;

    $db = (new Connection())->getConnection();

    if(!$filmId || !Films::getById($db, $filmId)){
      return $this->response("Film with id=$filmId not found", 404);
    }

    if($this->requestParams){
      if($film = Films::updateFilm($db, $filmId, $this->requestParams)){
        return $this->response('Data updated.', 200);
      }
    }
    return $this->response("Update error", 400);
  }


  /**
   * Метод DELETE
   * Удаление отдельной записи (по ее id)
   * http://ДОМЕН/users/films/1/DELETE
   * @return string
   */
  public function deleteAction() {

    $parse_url = parse_url($this->requestUri[0]);
    $filmId = $parse_url['path'] ?? null;

    $db = (new Connection())->getConnection();

    if(!$filmId || !Films::getById($db, $filmId)){
      return $this->response("User with id=$filmId not found", 404);
    }

    if(Films::deleteById($db, $filmId)){
      return $this->response('Data deleted.', 200);
    }
    return $this->response("Delete error", 500);
  }
}

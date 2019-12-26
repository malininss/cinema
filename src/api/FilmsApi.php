<?php
require_once('Api.php');
require_once('Connection.php');
require_once('Films.php');

class FilmsApi extends Api
{
    public $apiName = 'films';

    /**
     * Метод GET
     * Вывод списка всех записей
     * http://ДОМЕН/users
     * @return string
     */
    public function indexAction()
    {
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
     * http://ДОМЕН/users/1
     * @return string
     */
    public function viewAction()
    {

      //id должен быть первым параметром после /users/x
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
     * http://ДОМЕН/users + параметры запроса name, email
     * @return string
     */
    public function createAction()
    {
        $film_name = $this->requestParams['film_name'] ?? '';
        $film_description = $this->requestParams['film_description'] ?? '';
        $film_duration =  $this->requestParams['film_duration'] ?? '';
        $film_country = $this->requestParams['film_country'] ?? '';
        $film_img = $this->requestParams['film_img'] ?? '';

        $film = new Films();

        if($film_name && $film_description && $film_duration && $film_country && $film_img){
          $db = (new Connection())->getConnection();
          if ($film->saveFilm($db, [
            'film_name' => $film_name,
            'film_description' => $film_description,
            'film_duration' => intval($film_duration),
            'film_country' => $film_country,
            'film_img' => $film_img
          ])) {
            return $this->response('Data saved.', 200);
          }

        return $this->response("Saving error", 500);
    }
  }

    /**
     * Метод PUT
     * Обновление отдельной записи (по ее id)
     * http://ДОМЕН/users/1 + параметры запроса name, email
     * @return string
     */
    public function updateAction()
    {
        $parse_url = parse_url($this->requestUri[0]);
        $filmId = $parse_url['path'] ?? null;

        $db = (new Connection())->getConnection();

        if(!$filmId || !Films::getById($db, $filmId)){
            return $this->response("Film with id=$userId not found", 404);
        }

        // print_r($this->requestParams);

        // $film_name = $this->requestParams['name'] ?? '';
        // // $email = $this->requestParams['email'] ?? '';

        // if($film_name){
        //     if($user = Films::update($db, $userId, $name, $email)){
        //         return $this->response('Data updated.', 200);
        //     }
        // }
        // return $this->response("Update error", 400);
    }

    // /**
    //  * Метод DELETE
    //  * Удаление отдельной записи (по ее id)
    //  * http://ДОМЕН/users/1
    //  * @return string
    //  */
    // public function deleteAction()
    // {
    //     $parse_url = parse_url($this->requestUri[0]);
    //     $userId = $parse_url['path'] ?? null;

    //     $db = (new Db())->getConnect();

    //     if(!$userId || !Users::getById($db, $userId)){
    //         return $this->response("User with id=$userId not found", 404);
    //     }
    //     if(Users::deleteById($db, $userId)){
    //         return $this->response('Data deleted.', 200);
    //     }
    //     return $this->response("Delete error", 500);
    // }

}

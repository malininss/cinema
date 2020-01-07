<?php
require_once('Api.php');
require_once('Connection.php');
require_once('Halls.php');

// $test = ;



class HallsApi extends Api {

  public $apiName = 'halls';

  public function indexAction() {
      $db = (new Connection())->getConnection();
      $halls = Halls::getAll($db);
      if($halls){
          return $this->response($halls, 200);
      }
      return $this->response('Data not found', 404);
  }

  public function viewAction() {
      //id должен быть первым параметром после /halls/x
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
     * http://ДОМЕН/users + параметры запроса name, email
     * @return string
     */
    public function createAction() {
        $hall_name = $this->requestParams['hall_name'] ?? '';
        $hall_configuration = $this->requestParams['hall_configuration'] ?? file_get_contents('standart-hall-configuration.json');
        $hall_chair_price =  $this->requestParams['hall_chair_price'] ?? '';
        $hall_vip_chair_price = $this->requestParams['hall_vip_chair_price'] ?? '';

        $hall = new Halls();

        if($hall_name && $hall_configuration && $hall_chair_price && $hall_vip_chair_price){
          $db = (new Connection())->getConnection();

          if ($hall->saveHall($db, [
            'hall_name' => $hall_name,
            'hall_configuration' => $hall_configuration,
            'hall_chair_price' => $hall_chair_price,
            'hall_vip_chair_price' => $hall_vip_chair_price,
          ])) {
            return $this->response('Data saved.', 200);
          }

        return $this->response("Saving error", 500);
    }
  }

  public function updateAction() {

    $parse_url = parse_url($this->requestUri[0]);
    $hallId = $parse_url['path'] ?? null;

    $db = (new Connection())->getConnection();

    if(!$hallId || !Halls::getById($db, $hallId)){
        return $this->response("Hall with id=$hallId not found", 404);
    }

    if($this->requestParams){
        if($hall = Halls::updateHall($db, $hallId, $this->requestParams)){
            return $this->response('Data updated.', 200);
        }
    }
    return $this->response("Update error", 400);
  }


    // /**
    //  * Метод DELETE
    //  * Удаление отдельной записи (по ее id)
    //  * http://ДОМЕН/users/1
    //  * @return string
    //  */
    public function deleteAction()
    {

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

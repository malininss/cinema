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

  public function viewAction() {

  }

  public function createAction() {

  }

  public function updateAction() {

  }

  public function deleteAction() {

  }
}

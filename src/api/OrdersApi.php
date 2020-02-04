<?php
require_once('Api.php');
require_once('Connection.php');
require_once('Orders.php');

class OrdersApi extends Api {

  public $apiName = 'orders';

  /**
   * Метод GET
   * Вывод списка всех записей
   * http://ДОМЕН/api/orders
   * @return string
   */
  public function indexAction() {
    $db = (new Connection())->getConnection();
    $Orders = Orders::getAll($db);
    if($Orders){
      return $this->response($Orders, 200);
    }
    return $this->response('Data not found', 404);
  }

  /**
   * Метод GET
   * Просмотр отдельной записи (по id)
   * http://ДОМЕН/orders/1
   * @return string
   */
  public function viewAction() {

    //id должен быть первым параметром после /orders/
    $id = array_shift($this->requestUri);

    if($id){
      $db = (new Connection())->getConnection();
      $order = Orders::getById($db, $id);
      if($order){
          return $this->response($order, 200);
      }
    }
    return $this->response('Data not found', 404);
  }


  /**
   * Метод POST
   * Создание новой записи
   * http://ДОМЕН/api/orders
   * Отправлять параметры запроса: ordersId, orderPlaces, orderTotalPrice, orderDateOfFilm, orderdDateOfOrder, orderHallId, orderQrImg
   * @return string
   */
  public function createAction() {
    $db = (new Connection())->getConnection();

    $params = json_decode($this->requestParams,true);

    if($params){

      if(Orders::createOrder($db, $params)){
        return $this->response('Data saved.', 200);
      }

      return $this->response("Create error", 500);

    }
  }


  /**
   * Метод POST
   * Обновление отдельной записи (по ее id)
   * http://ДОМЕН/api/order/1/PUT
   * Отправлять параметры обновления: ordersId, orderPlaces, orderTotalPrice, orderDateOfFilm, orderdDateOfOrder, orderHallId, orderQrImg
   * @return string
   */
  public function updateAction() {

    $parse_url = parse_url($this->requestUri[0]);
    $orderId = $parse_url['path'] ?? null;
    $params = json_decode($this->requestParams,true);

    // if (isset($params['hallConfiguration'])) {
    //   $params['hallConfiguration'] = json_encode($params['hallConfiguration']);
    // }

    $db = (new Connection())->getConnection();

    if(!$orderIf || !Orders::getById($db, $orderId)){
      return $this->response("Order with id=$orderId not found", 404);
    }

    if($this->requestParams){
      if($order = Orders::updateOrder($db, $orderId, $params)){
        return $this->response('Data updated.', 200);
      }
    }
    return $this->response("Update error", 400);
  }


  /**
   * Метод POST
   * Удаление отдельной записи (по ее id)
   * http://ДОМЕН/api/orders/1/DELETE
   * @return string
   */
  public function deleteAction() {

    $parse_url = parse_url($this->requestUri[0]);
    $orderId = $parse_url['path'] ?? null;

    $db = (new Connection())->getConnection();

    if(!$orderId || !Orders::getById($db, $orderId)){
      return $this->response("Order with id=$orderId not found", 404);
    }


    if(HOrdersalls::deleteById($db, $orderId)){
      return $this->response('Data deleted.', 200);
    }
    return $this->response("Delete error", 500);
  }

}

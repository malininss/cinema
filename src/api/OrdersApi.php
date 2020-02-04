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

      if ($params['orderPlaces']) {
        $params['orderPlaces'] = json_encode($params['orderPlaces'], JSON_UNESCAPED_UNICODE);
      }

      $orderDateOfFilm = new DateTime();
      $orderDateOfFilm->setTimestamp((int)$params['orderDateOfFilm']);
      $orderDateOfFilm = $orderDateOfFilm->format('Y-m-d H:i:s');

      $orderDateOfOrder = new DateTime();
      $orderDateOfOrder = $orderDateOfOrder->format('Y-m-d H:i:s');

      $params['orderDateOfFilm'] = $orderDateOfFilm;
      $params['orderDateOfOrder'] = $orderDateOfOrder;

      function generateReservedCode($length = 10){
        $chars = 'abdefhiknrstyz123456789';
        $numChars = strlen($chars);
        $string = '';

        for ($i = 0; $i < $length; $i++) {
          $string .= substr($chars, rand(1, $numChars) - 1, 1);
        }
        return $string;
      }

      $reservedCode = generateReservedCode();

      $filmName = Films::getById($db, $params['orderFilmId'])['filmName'];
      $hallName = Halls::getById($db, $params['orderHallId'])['hallName'];
      $dateOfFilm = $params['orderDateOfFilm'];
      $orderPlaces = implode(", ", json_decode($params['orderPlaces']));

      $strForQR = "Код бронирования: $reservedCode. Фильм: $filmName. Зал: $hallName. Дата начала: $dateOfFilm. Места: $orderPlaces.";
      // ПОМЕНЯТЬ ПУТЬ НА КОРРЕКТНЫЙ!!!
      $urlToQr = 'qr/' . $reservedCode . '.png';
      QRcode::png($strForQR, $urlToQr, QR_ECLEVEL_L, 5);

      $params['orderReservedCode'] = $reservedCode;
      $params['orderQrImg'] = 'qr/' . $reservedCode . '.png';

      if(Orders::createOrder($db, $params)){
        return $this->response($urlToQr, 200);
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

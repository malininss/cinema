<?php

class Orders {

  /**
   * Метод для заказа
   * Принимает соединение с базой данных $db и масссив $arr с данными для создания зала из Orders.php
   * @return boolean
   */
  static public function createOrder($db, $arr) {

    $keysString = '';
    $valuesString = '';

    foreach ($arr as $key => $value) {
      $keysString .= $key . ',';
      if (is_integer($value)) {
        $valuesString .= $value . ',';
      } else {
        $valuesString .= "'$value'" . ',';
      }
    }

    $keysString = substr($keysString,0,-1);
    $valuesString = substr($valuesString,0,-1);

    $sql = mysqli_query($db, "INSERT INTO orders($keysString) VALUES ($valuesString)");

    if ($sql) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Метод получения всех заказов
   * Принимает соединение с базой данных $db из OrdersApi.php
   * @return boolean
   */
  static public function getAll($db) {
    $sql = mysqli_query($db, "SELECT * FROM orders");

    $allHalls = [];

    if ($sql->num_rows > 0 ) {
      while ($result = mysqli_fetch_assoc($sql)) {
        $allHalls[] = $result;
      }
    }
    return $allHalls;
  }


  /**
   * Метод получения конкретного заказа по ID
   * Принимает соединение с базой данных $db и $id из OrdersApi.php
   * @return boolean
   */
  static public function getById($db, $id){
    $sql = mysqli_query($db, "SELECT * FROM orders WHERE orderId=$id");
    return mysqli_fetch_assoc($sql);
  }


  /**
   * Метод обновления заказа по id
   * Принимает соединение с базой данных $db, $orderId и массив $arr с параметрами для обновления из OrdersApi.php
   * @return boolean
   */
  static public function updateOrder($db, $orderId, $arr) {
    $result = "";

    foreach ($arr as $key => $value) {
      if ($value === null) {
        $result .= "`$key` = NULL,";
      } else {
        $result .= "`$key` = '$value',";
      }
    }

    $result = substr($result,0,-1);

    $sql = mysqli_query($db, "UPDATE `orders` SET $result WHERE `orders`.`orderId` = $orderId;");
    if($sql) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Метод удаления заказа
   * Принимает соединение с базой данных $db и $orderId из OrdersApi.php
   * @return boolean
   */
  static public function deleteById($db, $hallId) {

  }
}

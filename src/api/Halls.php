<?php

class Halls {

  /**
   * Метод для создания зала
   * Принимает соединение с базой данных $db и масссив $arr с данными для создания зала из HallsApi.php
   * @return boolean
   */
  static public function createHall($db, $arr) {
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

    $sql = mysqli_query($db, "INSERT INTO halls($keysString) VALUES ($valuesString)");

    if ($sql) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Метод получения всех залов
   * Принимает соединение с базой данных $db из HallsApi.php
   * @return boolean
   */
  static public function getAll($db) {
    $sql = mysqli_query($db, "SELECT * FROM halls");

    $allHalls = [];

    if ($sql->num_rows > 0 ) {
      while ($result = mysqli_fetch_assoc($sql)) {
        $allHalls[] = $result;
      }
    }
    return $allHalls;
  }


  /**
   * Метод получения конкретного зала по IP
   * Принимает соединение с базой данных $db и $id из HallsApi.php
   * @return boolean
   */
  static public function getById($db, $id){
    $sql = mysqli_query($db, "SELECT * FROM halls WHERE hall_id=$id");
    return mysqli_fetch_assoc($sql);
  }


  /**
   * Метод обновления зала по id
   * Принимает соединение с базой данных $db, $hallId и массив $arr с параметрами для обновления из HallsApi.php
   * @return boolean
   */
  static public function updateHall($db, $hallId, $arr) {
    $result = "";

    foreach ($arr as $key => $value) {
      if ($value === null) {
        $result .= "`$key` = NULL,";
      } else {
        $result .= "`$key` = '$value',";
      }
    }

    $result = substr($result,0,-1);

    // print_r($result);

    $sql = mysqli_query($db, "UPDATE `halls` SET $result WHERE `halls`.`hall_id` = $hallId;");
    if($sql) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Метод удаления зала
   * Принимает соединение с базой данных $db и $hallId из HallsApi.php
   * @return boolean
   */
  static public function deleteById($db, $hallId) {
    $sql = mysqli_query($db, "DELETE FROM `halls` WHERE `halls`.`hall_id` = $hallId");
    if($sql) {
      return true;
    } else {
      return false;
    }
  }
}

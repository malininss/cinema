<?php

class ReservedHalls {


  /**
   * Метод получения всех залов
   * Принимает соединение с базой данных $db из ReservedHallsApi.php
   * @return boolean
   */
  static public function getAll($db) {
    $sql = mysqli_query($db, "SELECT * FROM reservedHalls");

    $allreservedHallsElement = [];

    if ($sql->num_rows > 0 ) {
      while ($result = mysqli_fetch_assoc($sql)) {
        $allreservedHallsElement[] = $result;
      }
    }
    return $allreservedHallsElement;
  }


  /**
   * Метод получения конкретного зала по IP
   * Принимает соединение с базой данных $db и $id из HallsApi.php
   * @return boolean
   */
  static public function getById($db, $id){
    $sql = mysqli_query($db, "SELECT * FROM reservedHalls WHERE reservedHallsId=$id");
    return mysqli_fetch_assoc($sql);
  }

  static public function getByIdAndTimestamp($db, $hallId, $timestamp) {
    $date = new DateTime();
    $date->setTimestamp($timestamp);


    $formattedDate = $date->format('Y-m-d H:i:s');
    // print_r($formattedDate);

    $sql = mysqli_query($db, "SELECT * FROM reservedHalls WHERE hallId=$hallId AND reservedHallsDate='$formattedDate'");
    return mysqli_fetch_assoc($sql);
  }

  /**
   * Метод для создания элемента расписания
   * Принимает соединение с базой данных $db и масссив $arr с данными для создания зала из ReservedHallsApi.php
   * @return boolean
   */
  static public function createReservedHallsElement($db, $arr) {

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

    // print_r($keysString);
    // print_r($keysString);


    $sql = mysqli_query($db, "INSERT INTO reservedHalls($keysString) VALUES ($valuesString)");

    if ($sql) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Метод обновления элемента расписания по id
   * Принимает соединение с базой данных $db, $reservedHallsId и массив $arr с параметрами для обновления из ReservedHallsApi.php
   * @return boolean
   */
  static public function updateReservedHallsElement($db, $reservedHallsId, $arr) {
    $result = "";

    foreach ($arr as $key => $value) {
      $result .= "`$key` = $value,";
    }

    $result = substr($result,0,-1);

    $sql = mysqli_query($db, "UPDATE `reservedHalls` SET $result WHERE `reservedHalls`.`reservedHallsId` = $reservedHallsId;");
    if($sql) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Метод удаления элемента расписания
   * Принимает соединение с базой данных $db и $reservedHallsId из ReservedHallsApi.php
   * @return boolean
   */
  static public function deleteById($db, $reservedHallsId) {
    $sql = mysqli_query($db, "DELETE FROM `reservedHalls` WHERE `reservedHalls`.`reservedHallsId` = $reservedHallsId");
    if($sql) {
      return true;
    } else {
      return false;
    }
  }

}

<?php

class Schedule {


  /**
   * Метод получения всех залов
   * Принимает соединение с базой данных $db из ScheduleApi.php
   * @return boolean
   */
  static public function getAll($db) {
    $sql = mysqli_query($db, "SELECT * FROM schedule");

    $allScheduleElement = [];

    if ($sql->num_rows > 0 ) {
      while ($result = mysqli_fetch_assoc($sql)) {
        $allScheduleElement[] = $result;
      }
    }
    return $allScheduleElement;
  }


  /**
   * Метод получения конкретного зала по IP
   * Принимает соединение с базой данных $db и $id из HallsApi.php
   * @return boolean
   */
  static public function getById($db, $id){
    $sql = mysqli_query($db, "SELECT * FROM schedule WHERE schedule_id=$id");
    return mysqli_fetch_assoc($sql);
  }

  static public function getByIdAndTimestamp($db, $hallId, $timestamp) {
    $date = new DateTime();
    $date->setTimestamp($timestamp);

    $formattedDate = $date->format('Y-m-d H:i:s');
    $sql = mysqli_query($db, "SELECT * FROM schedule WHERE hall_id=$hallId AND datatime='$formattedDate'");
    return mysqli_fetch_assoc($sql);
  }

  /**
   * Метод для создания элемента расписания
   * Принимает соединение с базой данных $db и масссив $arr с данными для создания зала из ScheduleApi.php
   * @return boolean
   */
  static public function createScheduleElement($db, $arr) {
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

    $sql = mysqli_query($db, "INSERT INTO schedule($keysString) VALUES ($valuesString)");

    if ($sql) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Метод обновления элемента расписания по id
   * Принимает соединение с базой данных $db, $scheduleId и массив $arr с параметрами для обновления из ScheduleApi.php
   * @return boolean
   */
  static public function updateScheduleElement($db, $scheduleId, $arr) {
    $result = "";

    foreach ($arr as $key => $value) {
      $result .= "`$key` = '$value',";
    }

    $result = substr($result,0,-1);

    $sql = mysqli_query($db, "UPDATE `schedule` SET $result WHERE `schedule`.`schedule_id` = $scheduleId;");
    if($sql) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Метод удаления элемента расписания
   * Принимает соединение с базой данных $db и $scheduleId из ScheduleApi.php
   * @return boolean
   */
  static public function deleteById($db, $scheduleId) {
    $sql = mysqli_query($db, "DELETE FROM `schedule` WHERE `schedule`.`schedule_id` = $scheduleId");
    if($sql) {
      return true;
    } else {
      return false;
    }
  }

}

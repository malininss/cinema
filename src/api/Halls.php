<?php

class Halls
{

  public function saveHall($db, $arr) {
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
      // echo '<p>Данные успешно добавлены в таблицу.</p>';
    } else {
      return false;
      // echo '<p>Произошла ошибка: ' . mysqli_error($db) . '</p>';
    }
  }



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



  static public function getById($db, $id){
    $sql = mysqli_query($db, "SELECT * FROM halls WHERE hall_id=$id");
    return mysqli_fetch_assoc($sql);
  }


  static public function updateHall($db, $hallId, $arr) {

    $result = "";

    foreach ($arr as $key => $value) {
      $result .= "`$key` = '$value',";
    }

    $result = substr($result,0,-1);

    print_r($result);

    $sql = mysqli_query($db, "UPDATE `halls` SET $result WHERE `halls`.`hall_id` = $hallId;");
    if($sql) {
      return true;
    } else {
      return false;
    }
  }



  static public function deleteById($db, $hallId) {
    $sql = mysqli_query($db, "DELETE FROM `halls` WHERE `halls`.`hall_id` = $hallId");
    if($sql) {
      return true;
    } else {
      return false;
    }
  }


}



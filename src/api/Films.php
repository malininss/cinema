<?php

class Films {

  /**
   * Метод для создания фильма
   * Принимает соединение с базой данных $db и масссив $arr с данными для создания зала из FilmsApi.php
   * @return boolean
   */
  static public function createFilm($db, $arr) {
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

    $sql = mysqli_query($db, "INSERT INTO films($keysString) VALUES ($valuesString)");

    if ($sql) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Метод получения всех фильмов
   * Принимает соединение с базой данных $db из FilmsApi.php
   * @return boolean
   */
  static public function getAll($db) {

    $sql = mysqli_query($db, "SELECT * FROM films");

    $allFilms = [];

    if ($sql->num_rows > 0 ) {
      while ($result = mysqli_fetch_assoc($sql)) {
        $allFilms[] = $result;
      }
    }

    return $allFilms;
  }


  /**
   * Метод получения конкретного фильма по IP
   * Принимает соединение с базой данных $db и $id из FilmsApi.php
   * @return boolean
   */
  static public function getById($db, $id){
    $sql = mysqli_query($db, "SELECT * FROM films WHERE film_id=$id");
    return mysqli_fetch_assoc($sql);
  }


  /**
   * Метод обновления фильма по id
   * Принимает соединение с базой данных $db, $filmsId и массив $arr с параметрами для обновления из FilmsApi.php
   * @return boolean
   */
  static public function updateFilm($db, $filmId, $arr) {
    $result = "";

    foreach ($arr as $key => $value) {
      $result .= "`$key` = '$value',";
    }

    $result = substr($result,0,-1);

    $sql = mysqli_query($db, "UPDATE `films` SET $result WHERE `films`.`film_id` = $filmId;");
    if($sql) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Метод удаления фильма
   * Принимает соединение с базой данных $db и $filmId из FilmsApi.php
   * @return boolean
   */
  static public function deleteById($db, $filmId) {
    $sql = mysqli_query($db, "DELETE FROM `films` WHERE `films`.`film_id` = $filmId");
    if($sql) {
      return true;
    } else {
      return false;
    }
  }


  // static public function getFilmWithSchedule() {

  // }
}

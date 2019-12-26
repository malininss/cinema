<?php

class Films
{

  public function saveFilm($db, $arr) {
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
      // echo '<p>Данные успешно добавлены в таблицу.</p>';
    } else {
      return false;
      // echo '<p>Произошла ошибка: ' . mysqli_error($db) . '</p>';
    }
  }

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

  static public function getById($db, $id){
    $sql = mysqli_query($db, "SELECT * FROM films WHERE film_id=$id");
    return mysqli_fetch_assoc($sql);
  }


  // public function addFilm()
  // {
  //   $sql = mysqli_query($this->connect->link, "INSERT INTO films(film_name, film_description, film_duration, film_country, film_img) VALUES ('123Звёздн23ые войны 44XXIII: Атака клонированных клонов', 'Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.', 130, 'Франция', '../assets/i/poster1.jpg')");

  //   if ($sql) {
  //     echo '<p>Данные успешно добавлены в таблицу.</p>';
  //   } else {
  //     echo '<p>Произошла ошибка: ' . mysqli_error($this->connect->link) . '</p>';
  //   }

  //   $this->connect->closeConnect();
  // }

  // public function editFilm()
  // {
  //   $sql = mysqli_query($this->connect->link, "UPDATE films SET film_name='Звёздные войны XXIII',film_duration=120 WHERE `film_id`=4");

  //   if ($sql) {
  //     echo '<p>Данные успешно обновлены.</p>';
  //   } else {
  //     echo '<p>Произошла ошибка: ' . mysqli_error($this->connect->link) . '</p>';
  //   }

  //   $this->connect->closeConnect();
  // }

  // public function deleteFilm()
  // {
  //   $sql = mysqli_query($this->connect->link, "DELETE FROM films WHERE film_id=4");

  //   if ($sql) {
  //     echo '<p>Данные удалены.</p>';
  //   } else {
  //     echo '<p>Произошла ошибка: ' . mysqli_error($this->connect->link) . '</p>';
  //   }

  //   $this->connect->closeConnect();
  // }

  // public function getFilms()
  // {
  //   $sql = mysqli_query($this->connect->link, "SELECT * FROM films");
  //   $allFilms = [];

  //   if ($sql->num_rows > 0 ) {
  //     while ($result = mysqli_fetch_assoc($sql)) {
  //       $allFilms[] = $result;
  //     }
  //   }
  //   $this->connect->closeConnect();

  //   return json_encode($allFilms, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
  // }

  // public function getFilm()
  // {
  //   $sql = mysqli_query($this->connect->link, "SELECT * FROM films WHERE film_id=7");
  //   $this->connect->closeConnect();

  //   return mysqli_fetch_assoc($sql);
  // }
}

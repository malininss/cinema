<?php

class Film
{
  private $connection;
  private $table_name = 'films';

  public $id;
  public $film_name;
  public $film_description;
  public $film_duration;
  public $film_country;
  public $film_img;

  public function __construct($db)
  {
    $this->connection = $db;
  }

  public function read() {
    $sql = mysqli_query($this->connection, "SELECT * FROM films");
    $allFilms = [];

    if ($sql->num_rows > 0 ) {
      while ($result = mysqli_fetch_assoc($sql)) {
        $allFilms[] = $result;
      }
    }

    return $allFilms;

  }
}

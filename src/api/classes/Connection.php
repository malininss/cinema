<?php

class Connection
{
    private $host;
    private $database;
    private $user;
    private $pswd;
    public $link;

    public function __construct()
    {
      $this->host = 'localhost';
      $this->database = 'cinema';
      $this->user = 'root';
      $this->pswd = '';
      $this->link = mysqli_connect($this->host, $this->user, $this->pswd, $this->database) or die("Не могу соединиться с базой данных.");

      if (!mysqli_set_charset($this->link, "utf8")) {
        mysqli_error($this->link);
        exit();
      } else {
          mysqli_character_set_name($this->link);
      }
    }

    public function closeConnect() {
        mysqli_close($this->link);
    }
}

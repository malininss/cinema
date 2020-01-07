<?php

class Schedule {


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



}

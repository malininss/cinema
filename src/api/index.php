<?php

require_once 'FilmsApi.php';
require_once 'HallsApi.php';
require_once 'ReservedHallsApi.php';



$url = explode('/', trim($_SERVER['REQUEST_URI'],'/'));

if (!isset($url[1])) {
  echo 'API не найдено';
} elseif ($url[1] === 'films') {
  try {
    $api = new FilmsApi();
    echo $api->run();
  } catch (Exception $e) {
      echo json_encode(Array('error' => $e->getMessage()));
  }
} elseif ($url[1] === 'halls') {
  try {
    $api = new HallsApi();
    echo $api->run();
  } catch (Exception $e) {
      echo json_encode(Array('error' => $e->getMessage()));
  }
} elseif ($url[1] === 'reservedhalls') {
  try {
    $api = new ReservedHallsApi();
    echo $api->run();
  } catch (Exception $e) {
      echo json_encode(Array('error' => $e->getMessage()));
  }
}








// $ch = curl_init();
// curl_setopt_array($ch, array(
//     CURLOPT_URL => 'http://localhost/api/',
//     CURLOPT_CUSTOMREQUEST => 'OPTIONS',
//     CURLOPT_RETURNTRANSFER => true,
//     CURLOPT_HEADER => true,
//     CURLOPT_NOBODY => true,
//     CURLOPT_VERBOSE => true,
// ));
// $r = curl_exec($ch);

// echo PHP_EOL.'Response Headers:'.PHP_EOL;
// print('<pre>');
// print_r($r);
// print('</pre>');
// curl_close($ch);

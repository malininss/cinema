<?php

require_once 'FilmsApi.php';
require_once 'HallsApi.php';
require_once 'ReservedHallsApi.php';
require_once 'OrdersApi.php';
require_once 'phpqrcode.php';

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
} elseif ($url[1] === 'orders') {
  try {
    $api = new OrdersApi();
    echo $api->run();
  } catch (Exception $e) {
      echo json_encode(Array('error' => $e->getMessage()));
  }
}

<?php

$email = $_POST['email'];
$password = $_POST['pwd'];

if ($email === 'adm@mail.ru' && $password === '12345') {
  header("HTTP/1.1 200 OK ");
} else {
  header("HTTP/1.1 404 Not Found");
}

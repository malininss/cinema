<?php
spl_autoload_register(function ($class_name) {
    include $_SERVER['DOCUMENT_ROOT']  . '/classes/' . $class_name . '.php';
});

$filmEditor = new FilmEditor();
header('Access-Control-Allow-Origin: *');

$response = $filmEditor->getFilms();
print_r($response);
exit;

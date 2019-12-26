<?php
spl_autoload_register(function ($class_name) {
    include $_SERVER['DOCUMENT_ROOT']  . '/classes/' . $class_name . '.php';
});

print_r($_SERVER['REQUEST_METHOD']);


// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json; charset=UTF-8");

// $connection = new Connection();
// $db = $connection->getConnection();


// $sql = mysqli_query($db, "SELECT * FROM films");
// $allFilms = [];

// if ($sql->num_rows > 0 ) {
//   while ($result = mysqli_fetch_assoc($sql)) {
//     $allFilms[] = $result;
//   }
// }

// http_response_code(200);

// echo json_encode($allFilms, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

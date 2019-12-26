<?php
spl_autoload_register(function ($class_name) {
    include $_SERVER['DOCUMENT_ROOT']  . '/classes/' . $class_name . '.php';
});

try {
    $api = new FilmsApi();
    echo $api->run();
} catch (Exception $e) {
    echo json_encode(Array('error' => $e->getMessage()));
}

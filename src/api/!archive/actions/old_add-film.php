<?php
spl_autoload_register(function ($class_name) {
    include $_SERVER['DOCUMENT_ROOT']  . '/classes/' . $class_name . '.php';
});

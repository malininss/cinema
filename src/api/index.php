<?php
require_once 'FilmsApi.php';

$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => 'http://localhost/api/',
    CURLOPT_CUSTOMREQUEST => 'OPTIONS',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER => true,
    CURLOPT_NOBODY => true,
    CURLOPT_VERBOSE => true,
));
$r = curl_exec($ch);

echo PHP_EOL.'Response Headers:'.PHP_EOL;
print('<pre>');
print_r($r);
print('</pre>');
curl_close($ch);


// try {
//     $api = new FilmsApi();
//     echo $api->run();
// } catch (Exception $e) {
//     echo json_encode(Array('error' => $e->getMessage()));
// }

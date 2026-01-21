<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

echo json_encode([
    'status' => 'ok',
    'message' => 'API is working',
    'php_version' => phpversion(),
    'timestamp' => date('Y-m-d H:i:s')
]);

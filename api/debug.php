<?php
// Debug endpoint - DELETE THIS FILE after debugging!
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

function getEnvDebug($name) {
    if (getenv($name) !== false) return ['value' => getenv($name), 'source' => 'getenv'];
    if (isset($_ENV[$name])) return ['value' => $_ENV[$name], 'source' => '$_ENV'];
    if (isset($_SERVER[$name])) return ['value' => $_SERVER[$name], 'source' => '$_SERVER'];
    return ['value' => 'NOT SET', 'source' => 'none'];
}

echo json_encode([
    'env_vars' => [
        'DB_HOST' => getEnvDebug('DB_HOST'),
        'DB_PORT' => getEnvDebug('DB_PORT'),
        'DB_NAME' => getEnvDebug('DB_NAME'),
        'DB_USER' => getEnvDebug('DB_USER'),
        'DB_PASSWORD' => getenv('DB_PASSWORD') || isset($_ENV['DB_PASSWORD']) || isset($_SERVER['DB_PASSWORD']) ? '***SET***' : 'NOT SET',
    ],
    'all_env_keys' => array_keys($_ENV),
    'all_server_keys' => array_filter(array_keys($_SERVER), function($k) {
        return strpos($k, 'DB_') === 0 || strpos($k, 'MYSQL') === 0;
    }),
    'php_version' => PHP_VERSION,
]);

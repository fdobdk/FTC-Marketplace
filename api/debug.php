<?php
// Debug endpoint - DELETE THIS FILE after debugging!
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

echo json_encode([
    'env_vars' => [
        'DB_HOST' => getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? 'NOT SET'),
        'DB_PORT' => getenv('DB_PORT') ?: ($_ENV['DB_PORT'] ?? 'NOT SET'),
        'DB_NAME' => getenv('DB_NAME') ?: ($_ENV['DB_NAME'] ?? 'NOT SET'),
        'DB_USER' => getenv('DB_USER') ?: ($_ENV['DB_USER'] ?? 'NOT SET'),
        'DB_PASSWORD' => getenv('DB_PASSWORD') ? '***SET***' : 'NOT SET',
    ],
    'all_env_keys' => array_keys($_ENV),
    'server' => [
        'PHP_VERSION' => PHP_VERSION,
    ]
]);

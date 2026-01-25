<?php
// API Root - Returns API info
require_once __DIR__ . '/config/cors.php';

echo json_encode([
    'name' => 'FTC Marketplace API',
    'version' => '1.0.0',
    'status' => 'running',
    'endpoints' => [
        'auth' => '/auth/login, /auth/register, /auth/me, /auth/profile',
        'listings' => '/listings, /listings/detail, /listings/my',
        'teams' => '/teams, /teams/detail',
        'admin' => '/admin/listings, /admin/comments, /admin/stats'
    ]
]);

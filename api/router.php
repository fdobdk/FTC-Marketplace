<?php
// Router for PHP built-in server
// This handles routing for the production server on Railway

// Set CORS headers for all requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 86400");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove leading slash for file path checking
$filePath = __DIR__ . $uri;

// If the file exists, serve it directly
if ($uri !== '/' && file_exists($filePath)) {
    // Check if it's a PHP file
    if (pathinfo($uri, PATHINFO_EXTENSION) === 'php') {
        require $filePath;
        return true;
    }
    return false; // Let PHP serve static files
}

// Default to index.php
if (file_exists(__DIR__ . '/index.php')) {
    require __DIR__ . '/index.php';
} else {
    header("Content-Type: application/json");
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
}

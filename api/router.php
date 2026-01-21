<?php
// Router for PHP built-in server
// This handles routing for the development server

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// If the file exists, serve it directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    // Check if it's a PHP file
    if (pathinfo($uri, PATHINFO_EXTENSION) === 'php') {
        require __DIR__ . $uri;
        return true;
    }
    return false; // Let PHP serve static files
}

// Default to index.php or test.php
if (file_exists(__DIR__ . '/index.php')) {
    require __DIR__ . '/index.php';
} else {
    require __DIR__ . '/test.php';
}

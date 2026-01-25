<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Method not allowed', 405);
}

$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
    errorResponse('Name, email, and password are required');
}

$name = trim($data['name']);
$email = trim(strtolower($data['email']));
$password = $data['password'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    errorResponse('Invalid email format');
}

// Validate password length
if (strlen($password) < 8) {
    errorResponse('Password must be at least 8 characters');
}

try {
    $database = new Database();
    $db = $database->getConnection();
    $auth = new Auth($db);

    // Check if email already exists
    $query = "SELECT id FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->execute([':email' => $email]);

    if ($stmt->fetch()) {
        errorResponse('Email already registered');
    }

    // Create user
    $hashedPassword = $auth->hashPassword($password);

    $query = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':password' => $hashedPassword
    ]);

    $user_id = $db->lastInsertId();

    // Generate token
    $token = $auth->generateToken($user_id);

    successResponse([
        'token' => $token,
        'user' => [
            'id' => $user_id,
            'name' => $name,
            'email' => $email,
            'team_id' => null,
            'role' => 'member'
        ]
    ], 'Registration successful');

} catch (Exception $e) {
    errorResponse('Registration failed: ' . $e->getMessage(), 500);
}

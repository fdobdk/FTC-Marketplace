<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/response.php';
require_once __DIR__ . '/../utils/encryption.php';

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
    $encryption = new Encryption();

    // Create hash for searching
    $emailHash = $encryption->hashForSearch($email);

    // Check if email already exists (by hash)
    $query = "SELECT id FROM users WHERE email_hash = :email_hash";
    $stmt = $db->prepare($query);
    $stmt->execute([':email_hash' => $emailHash]);

    if ($stmt->fetch()) {
        errorResponse('Email already registered');
    }

    // Encrypt the email
    $encryptedEmail = $encryption->encrypt($email);

    // Create user
    $hashedPassword = $auth->hashPassword($password);

    $query = "INSERT INTO users (name, email, email_hash, password) VALUES (:name, :email, :email_hash, :password)";
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':name' => $name,
        ':email' => $encryptedEmail,
        ':email_hash' => $emailHash,
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

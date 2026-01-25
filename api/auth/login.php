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
if (empty($data['email']) || empty($data['password'])) {
    errorResponse('Email and password are required');
}

$email = trim(strtolower($data['email']));
$password = $data['password'];

try {
    $database = new Database();
    $db = $database->getConnection();
    $auth = new Auth($db);
    $encryption = new Encryption();

    // Create hash for searching
    $emailHash = $encryption->hashForSearch($email);

    // Get user by email hash (for encrypted emails) or plain email (for legacy)
    $query = "SELECT u.*, t.team_number, t.name as team_name, t.city, t.state
              FROM users u
              LEFT JOIN teams t ON u.team_id = t.id
              WHERE u.email_hash = :email_hash OR u.email = :email";
    $stmt = $db->prepare($query);
    $stmt->execute([':email_hash' => $emailHash, ':email' => $email]);
    $user = $stmt->fetch();

    if (!$user) {
        errorResponse('Invalid email or password', 401);
    }

    // Verify password
    if (!$auth->verifyPassword($password, $user['password'])) {
        errorResponse('Invalid email or password', 401);
    }

    // Generate token
    $token = $auth->generateToken($user['id']);

    // Build team object if user has a team
    $team = null;
    if ($user['team_id']) {
        $team = [
            'id' => $user['team_id'],
            'team_number' => $user['team_number'],
            'name' => $user['team_name'],
            'city' => $user['city'],
            'state' => $user['state']
        ];
    }

    // Decrypt emails for response
    $decryptedEmail = $encryption->decrypt($user['email']);
    $decryptedContactEmail = $user['contact_email'] ? $encryption->decrypt($user['contact_email']) : null;

    successResponse([
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $decryptedEmail,
            'team_id' => $user['team_id'],
            'role' => $user['role'],
            'contact_email' => $decryptedContactEmail,
            'contact_phone' => $user['contact_phone'],
            'contact_discord' => $user['contact_discord'],
            'team_role' => $user['team_role'],
            'team_status' => $user['team_status'],
            'bio' => $user['bio'],
            'graduation_year' => $user['graduation_year'],
            'specialties' => $user['specialties'],
            'is_site_admin' => (bool)$user['is_site_admin']
        ],
        'team' => $team
    ], 'Login successful');

} catch (Exception $e) {
    errorResponse('Login failed: ' . $e->getMessage(), 500);
}

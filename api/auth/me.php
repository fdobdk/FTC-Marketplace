<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/response.php';
require_once __DIR__ . '/../utils/encryption.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    errorResponse('Method not allowed', 405);
}

try {
    $database = new Database();
    $db = $database->getConnection();
    $auth = new Auth($db);
    $encryption = new Encryption();

    $user = $auth->getAuthenticatedUser();

    if (!$user) {
        errorResponse('Unauthorized', 401);
    }

    // Decrypt emails
    $decryptedEmail = $encryption->decrypt($user['email']);
    $decryptedContactEmail = $user['contact_email'] ? $encryption->decrypt($user['contact_email']) : null;

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

    successResponse([
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
    ]);

} catch (Exception $e) {
    errorResponse('Error: ' . $e->getMessage(), 500);
}

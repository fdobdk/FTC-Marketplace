<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    errorResponse('Method not allowed', 405);
}

try {
    $database = new Database();
    $db = $database->getConnection();
    $auth = new Auth($db);

    $user = $auth->getAuthenticatedUser();

    if (!$user) {
        errorResponse('Unauthorized', 401);
    }

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
            'email' => $user['email'],
            'team_id' => $user['team_id'],
            'role' => $user['role'],
            'contact_email' => $user['contact_email'],
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

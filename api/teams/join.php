<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Method not allowed', 405);
}

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);

$user = $auth->getAuthenticatedUser();

if (!$user) {
    errorResponse('Unauthorized', 401);
}

if ($user['team_id']) {
    errorResponse('You are already part of a team. Leave your current team first to join another.');
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['team_id'])) {
    errorResponse('Team ID is required');
}

$team_id = intval($data['team_id']);

// Check if team exists
$query = "SELECT * FROM teams WHERE id = :team_id";
$stmt = $db->prepare($query);
$stmt->execute([':team_id' => $team_id]);
$team = $stmt->fetch();

if (!$team) {
    errorResponse('Team not found', 404);
}

try {
    // Add user to team as member
    $query = "UPDATE users SET team_id = :team_id, role = 'member' WHERE id = :user_id";
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':team_id' => $team_id,
        ':user_id' => $user['id']
    ]);

    successResponse([
        'team' => [
            'id' => $team['id'],
            'team_number' => $team['team_number'],
            'name' => $team['name'],
            'description' => $team['description'],
            'city' => $team['city'],
            'state' => $team['state'],
            'contact_email' => $team['contact_email']
        ]
    ], 'Successfully joined team');

} catch (Exception $e) {
    errorResponse('Failed to join team: ' . $e->getMessage(), 500);
}

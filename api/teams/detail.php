<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/response.php';

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);

// Get team ID from URL
$team_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if (!$team_id) {
    errorResponse('Team ID is required', 400);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'PUT') {
    updateTeam($db, $auth, $team_id);
} elseif ($method !== 'GET') {
    errorResponse('Method not allowed', 405);
}

// Get team details
$query = "SELECT t.*,
                 COUNT(DISTINCT u.id) as members_count,
                 COUNT(DISTINCT l.id) as listings_count
          FROM teams t
          LEFT JOIN users u ON u.team_id = t.id
          LEFT JOIN listings l ON l.team_id = t.id AND l.status = 'active'
          WHERE t.id = :id
          GROUP BY t.id";

$stmt = $db->prepare($query);
$stmt->execute([':id' => $team_id]);
$team = $stmt->fetch();

if (!$team) {
    errorResponse('Team not found', 404);
}

// Get team members
$query = "SELECT id, name, role, team_role, team_status, graduation_year FROM users WHERE team_id = :team_id ORDER BY role DESC, name ASC";
$stmt = $db->prepare($query);
$stmt->execute([':team_id' => $team_id]);
$members = $stmt->fetchAll();

$team['members'] = $members;

successResponse(['team' => $team]);

function updateTeam($db, $auth, $team_id) {
    $user = $auth->getAuthenticatedUser();

    if (!$user) {
        errorResponse('Unauthorized', 401);
    }

    // Check if user is a team admin of this team OR a site admin
    $isTeamAdmin = $user['team_id'] == $team_id && $user['role'] === 'admin';
    $isSiteAdmin = $auth->isSiteAdmin($user);

    if (!$isTeamAdmin && !$isSiteAdmin) {
        errorResponse('Only team admins can update team information', 403);
    }

    // Check if team exists
    $query = "SELECT * FROM teams WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $team_id]);
    $team = $stmt->fetch();

    if (!$team) {
        errorResponse('Team not found', 404);
    }

    $data = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    $required = ['team_number', 'name', 'city', 'state', 'contact_email'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            errorResponse("$field is required");
        }
    }

    $team_number = trim($data['team_number']);
    $name = trim($data['name']);
    $city = trim($data['city']);
    $state = trim($data['state']);
    $contact_email = trim($data['contact_email']);
    $description = isset($data['description']) ? trim($data['description']) : '';

    // Validate team number format
    if (!preg_match('/^\d+$/', $team_number)) {
        errorResponse('Team number must contain only digits');
    }

    // Check if team number exists (if changed)
    if ($team_number !== $team['team_number']) {
        $query = "SELECT id FROM teams WHERE team_number = :team_number AND id != :id";
        $stmt = $db->prepare($query);
        $stmt->execute([':team_number' => $team_number, ':id' => $team_id]);

        if ($stmt->fetch()) {
            errorResponse('Team number already registered by another team');
        }
    }

    // Validate email
    if (!filter_var($contact_email, FILTER_VALIDATE_EMAIL)) {
        errorResponse('Invalid contact email format');
    }

    try {
        $query = "UPDATE teams SET
                    team_number = :team_number,
                    name = :name,
                    description = :description,
                    city = :city,
                    state = :state,
                    contact_email = :contact_email,
                    updated_at = NOW()
                  WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':team_number' => $team_number,
            ':name' => $name,
            ':description' => $description,
            ':city' => $city,
            ':state' => $state,
            ':contact_email' => $contact_email,
            ':id' => $team_id
        ]);

        successResponse([
            'team' => [
                'id' => $team_id,
                'team_number' => $team_number,
                'name' => $name,
                'description' => $description,
                'city' => $city,
                'state' => $state,
                'contact_email' => $contact_email
            ]
        ], 'Team updated successfully');

    } catch (PDOException $e) {
        errorResponse('Database error: ' . $e->getMessage(), 500);
    } catch (Exception $e) {
        errorResponse('Failed to update team: ' . $e->getMessage(), 500);
    }
}

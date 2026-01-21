<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../utils/auth.php';
require_once '../utils/response.php';

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getTeams($db);
        break;
    case 'POST':
        createTeam($db, $auth);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

function getTeams($db) {
    $state = isset($_GET['state']) ? $_GET['state'] : null;
    $search = isset($_GET['search']) ? $_GET['search'] : null;

    $query = "SELECT t.*,
                     COUNT(DISTINCT u.id) as members_count,
                     COUNT(DISTINCT l.id) as listings_count
              FROM teams t
              LEFT JOIN users u ON u.team_id = t.id
              LEFT JOIN listings l ON l.team_id = t.id AND l.status = 'active'
              WHERE 1=1";

    $params = [];

    if ($state) {
        $query .= " AND t.state = :state";
        $params[':state'] = $state;
    }

    if ($search) {
        $query .= " AND (t.team_number LIKE :search OR t.name LIKE :search2 OR t.city LIKE :search3)";
        $params[':search'] = "%$search%";
        $params[':search2'] = "%$search%";
        $params[':search3'] = "%$search%";
    }

    $query .= " GROUP BY t.id ORDER BY t.team_number ASC";

    $stmt = $db->prepare($query);
    $stmt->execute($params);
    $teams = $stmt->fetchAll();

    successResponse(['teams' => $teams]);
}

function createTeam($db, $auth) {
    $user = $auth->getAuthenticatedUser();

    if (!$user) {
        errorResponse('Unauthorized', 401);
    }

    if ($user['team_id']) {
        errorResponse('You are already part of a team');
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

    // Check if team number exists
    $query = "SELECT id FROM teams WHERE team_number = :team_number";
    $stmt = $db->prepare($query);
    $stmt->execute([':team_number' => $team_number]);

    if ($stmt->fetch()) {
        errorResponse('Team number already registered');
    }

    // Validate email
    if (!filter_var($contact_email, FILTER_VALIDATE_EMAIL)) {
        errorResponse('Invalid contact email format');
    }

    try {
        $db->beginTransaction();

        // Create team
        $query = "INSERT INTO teams (team_number, name, description, city, state, contact_email, created_by)
                  VALUES (:team_number, :name, :description, :city, :state, :contact_email, :created_by)";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':team_number' => $team_number,
            ':name' => $name,
            ':description' => $description,
            ':city' => $city,
            ':state' => $state,
            ':contact_email' => $contact_email,
            ':created_by' => $user['id']
        ]);

        $team_id = $db->lastInsertId();

        // Add user to team as admin
        $query = "UPDATE users SET team_id = :team_id, role = 'admin' WHERE id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':team_id' => $team_id,
            ':user_id' => $user['id']
        ]);

        $db->commit();

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
        ], 'Team created successfully');

    } catch (PDOException $e) {
        $db->rollBack();
        errorResponse('Database error: ' . $e->getMessage(), 500);
    } catch (Exception $e) {
        $db->rollBack();
        errorResponse('Failed to create team: ' . $e->getMessage(), 500);
    }
}

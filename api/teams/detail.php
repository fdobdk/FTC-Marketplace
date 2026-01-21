<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../utils/auth.php';
require_once '../utils/response.php';

$database = new Database();
$db = $database->getConnection();

// Get team ID from URL
$team_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if (!$team_id) {
    errorResponse('Team ID is required', 400);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
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

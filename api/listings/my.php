<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../utils/auth.php';
require_once '../utils/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    errorResponse('Method not allowed', 405);
}

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);

$user = $auth->getAuthenticatedUser();

if (!$user) {
    errorResponse('Unauthorized', 401);
}

if (!$user['team_id']) {
    successResponse(['listings' => []]);
}

// Get user's listings
$query = "SELECT l.*, t.team_number, t.name as team_name, t.city, t.state
          FROM listings l
          JOIN teams t ON l.team_id = t.id
          WHERE l.team_id = :team_id AND l.status != 'deleted'
          ORDER BY l.created_at DESC";

$stmt = $db->prepare($query);
$stmt->execute([':team_id' => $user['team_id']]);
$listings = $stmt->fetchAll();

successResponse(['listings' => $listings]);

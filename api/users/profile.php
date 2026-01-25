<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/response.php';
require_once __DIR__ . '/../utils/encryption.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    errorResponse('Method not allowed', 405);
}

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);
$encryption = new Encryption();

// Authentication is optional - affects what info is returned
$currentUser = $auth->getAuthenticatedUser();

// Get user ID from URL
$user_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if (!$user_id) {
    errorResponse('User ID is required', 400);
}

// Get user profile
$query = "SELECT u.id, u.name, u.team_id, u.role, u.team_role, u.team_status,
                 u.bio, u.graduation_year, u.specialties, u.created_at,
                 u.contact_email, u.contact_discord,
                 t.team_number, t.name as team_name, t.city as team_city, t.state as team_state
          FROM users u
          LEFT JOIN teams t ON u.team_id = t.id
          WHERE u.id = :id";

$stmt = $db->prepare($query);
$stmt->execute([':id' => $user_id]);
$user = $stmt->fetch();

if (!$user) {
    errorResponse('User not found', 404);
}

// Build public profile response
$profile = [
    'id' => $user['id'],
    'name' => $user['name'],
    'team_role' => $user['team_role'],
    'team_status' => $user['team_status'],
    'bio' => $user['bio'],
    'graduation_year' => $user['graduation_year'],
    'specialties' => $user['specialties'],
    'member_since' => $user['created_at']
];

// Add team info if user is part of a team
if ($user['team_id']) {
    $profile['team'] = [
        'id' => $user['team_id'],
        'team_number' => $user['team_number'],
        'name' => $user['team_name'],
        'city' => $user['team_city'],
        'state' => $user['team_state'],
        'is_admin' => $user['role'] === 'admin'
    ];
}

// Only show contact info to authenticated users
if ($currentUser) {
    $decryptedContactEmail = $user['contact_email'] ? $encryption->decrypt($user['contact_email']) : null;
    $profile['contact'] = [
        'email' => $decryptedContactEmail,
        'discord' => $user['contact_discord']
    ];
}

// Get user's listings count
$query = "SELECT COUNT(*) as count FROM listings WHERE user_id = :user_id AND status = 'active'";
$stmt = $db->prepare($query);
$stmt->execute([':user_id' => $user_id]);
$profile['listings_count'] = intval($stmt->fetch()['count']);

successResponse(['profile' => $profile]);

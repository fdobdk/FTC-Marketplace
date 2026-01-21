<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../utils/auth.php';
require_once '../utils/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
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

    $data = json_decode(file_get_contents('php://input'), true);

    $name = isset($data['name']) ? trim($data['name']) : $user['name'];
    $email = isset($data['email']) ? trim(strtolower($data['email'])) : $user['email'];

    // Contact fields - allow null/empty
    $contact_email = isset($data['contact_email']) ? trim($data['contact_email']) : $user['contact_email'];
    $contact_phone = isset($data['contact_phone']) ? trim($data['contact_phone']) : $user['contact_phone'];
    $contact_discord = isset($data['contact_discord']) ? trim($data['contact_discord']) : $user['contact_discord'];

    // Profile customization fields
    $team_role = isset($data['team_role']) ? trim($data['team_role']) : $user['team_role'];
    $team_status = isset($data['team_status']) ? $data['team_status'] : $user['team_status'];
    $bio = isset($data['bio']) ? trim($data['bio']) : $user['bio'];
    $graduation_year = isset($data['graduation_year']) ? intval($data['graduation_year']) : $user['graduation_year'];
    $specialties = isset($data['specialties']) ? trim($data['specialties']) : $user['specialties'];

    // Validate team_status
    $valid_statuses = ['active', 'alumni', 'mentor'];
    if ($team_status && !in_array($team_status, $valid_statuses)) {
        $team_status = 'active';
    }

    // Validate graduation_year (reasonable range)
    if ($graduation_year && ($graduation_year < 2000 || $graduation_year > 2050)) {
        $graduation_year = null;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        errorResponse('Invalid email format');
    }

    // Validate contact_email if provided
    if ($contact_email && !filter_var($contact_email, FILTER_VALIDATE_EMAIL)) {
        errorResponse('Invalid contact email format');
    }

    // Check if email is taken by another user
    if ($email !== $user['email']) {
        $query = "SELECT id FROM users WHERE email = :email AND id != :id";
        $stmt = $db->prepare($query);
        $stmt->execute([':email' => $email, ':id' => $user['id']]);

        if ($stmt->fetch()) {
            errorResponse('Email already in use');
        }
    }

    // Update user
    $query = "UPDATE users SET
        name = :name,
        email = :email,
        contact_email = :contact_email,
        contact_phone = :contact_phone,
        contact_discord = :contact_discord,
        team_role = :team_role,
        team_status = :team_status,
        bio = :bio,
        graduation_year = :graduation_year,
        specialties = :specialties
        WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':contact_email' => $contact_email ?: null,
        ':contact_phone' => $contact_phone ?: null,
        ':contact_discord' => $contact_discord ?: null,
        ':team_role' => $team_role ?: null,
        ':team_status' => $team_status ?: 'active',
        ':bio' => $bio ?: null,
        ':graduation_year' => $graduation_year ?: null,
        ':specialties' => $specialties ?: null,
        ':id' => $user['id']
    ]);

    successResponse([
        'user' => [
            'id' => $user['id'],
            'name' => $name,
            'email' => $email,
            'team_id' => $user['team_id'],
            'role' => $user['role'],
            'contact_email' => $contact_email,
            'contact_phone' => $contact_phone,
            'contact_discord' => $contact_discord,
            'team_role' => $team_role,
            'team_status' => $team_status,
            'bio' => $bio,
            'graduation_year' => $graduation_year,
            'specialties' => $specialties,
            'is_site_admin' => $user['is_site_admin']
        ]
    ], 'Profile updated successfully');

} catch (Exception $e) {
    errorResponse('Error: ' . $e->getMessage(), 500);
}

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

    if (empty($data['current_password']) || empty($data['new_password'])) {
        errorResponse('Current password and new password are required');
    }

    // Get current password hash
    $query = "SELECT password FROM users WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $user['id']]);
    $result = $stmt->fetch();

    // Verify current password
    if (!$auth->verifyPassword($data['current_password'], $result['password'])) {
        errorResponse('Current password is incorrect', 401);
    }

    // Validate new password
    if (strlen($data['new_password']) < 8) {
        errorResponse('New password must be at least 8 characters');
    }

    // Update password
    $hashedPassword = $auth->hashPassword($data['new_password']);

    $query = "UPDATE users SET password = :password WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':password' => $hashedPassword,
        ':id' => $user['id']
    ]);

    successResponse([], 'Password changed successfully');

} catch (Exception $e) {
    errorResponse('Error: ' . $e->getMessage(), 500);
}

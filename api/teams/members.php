<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/response.php';
require_once __DIR__ . '/../utils/encryption.php';

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);
$encryption = new Encryption();

$user = $auth->getAuthenticatedUser();

if (!$user) {
    errorResponse('Unauthorized', 401);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getTeamMembers($db, $user, $encryption);
        break;
    case 'PUT':
        updateMember($db, $auth, $user, $encryption);
        break;
    case 'DELETE':
        removeMember($db, $auth, $user);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

function getTeamMembers($db, $user, $encryption) {
    $team_id = isset($_GET['team_id']) ? intval($_GET['team_id']) : $user['team_id'];

    if (!$team_id) {
        errorResponse('Team ID is required', 400);
    }

    $query = "SELECT id, name, email, role, team_role, team_status, graduation_year, created_at
              FROM users
              WHERE team_id = :team_id
              ORDER BY role DESC, name ASC";
    $stmt = $db->prepare($query);
    $stmt->execute([':team_id' => $team_id]);
    $members = $stmt->fetchAll();

    // Decrypt emails
    foreach ($members as &$member) {
        $member['email'] = $encryption->decrypt($member['email']);
    }

    successResponse(['members' => $members]);
}

function updateMember($db, $auth, $user, $encryption) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['user_id'])) {
        errorResponse('User ID is required');
    }

    $target_user_id = intval($data['user_id']);

    // Get the target user's team
    $query = "SELECT team_id, role FROM users WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $target_user_id]);
    $targetUser = $stmt->fetch();

    if (!$targetUser) {
        errorResponse('User not found', 404);
    }

    $team_id = $targetUser['team_id'];

    // Check if current user is a team admin of this team OR site admin
    $isTeamAdmin = $user['team_id'] == $team_id && $user['role'] === 'admin';
    $isSiteAdmin = $auth->isSiteAdmin($user);

    if (!$isTeamAdmin && !$isSiteAdmin) {
        errorResponse('Only team admins can manage members', 403);
    }

    // Prevent self-demotion if you're the only admin
    if (isset($data['role']) && $data['role'] !== 'admin' && $target_user_id == $user['id']) {
        $query = "SELECT COUNT(*) as admin_count FROM users WHERE team_id = :team_id AND role = 'admin'";
        $stmt = $db->prepare($query);
        $stmt->execute([':team_id' => $team_id]);
        $adminCount = $stmt->fetch()['admin_count'];

        if ($adminCount <= 1) {
            errorResponse('Cannot demote yourself. You are the only team admin. Promote another member first.');
        }
    }

    $fields = [];
    $params = [':id' => $target_user_id];

    // Update role (admin/member)
    if (isset($data['role']) && in_array($data['role'], ['admin', 'member'])) {
        $fields[] = 'role = :role';
        $params[':role'] = $data['role'];
    }

    if (empty($fields)) {
        errorResponse('No fields to update');
    }

    $query = "UPDATE users SET " . implode(', ', $fields) . " WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute($params);

    // Get updated member info
    $query = "SELECT id, name, email, role, team_role, team_status, graduation_year FROM users WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $target_user_id]);
    $member = $stmt->fetch();

    // Decrypt email
    $member['email'] = $encryption->decrypt($member['email']);

    $action = $data['role'] === 'admin' ? 'promoted to admin' : 'demoted to member';
    successResponse(['member' => $member], "Member {$action} successfully");
}

function removeMember($db, $auth, $user) {
    $target_user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

    if (!$target_user_id) {
        errorResponse('User ID is required');
    }

    // Get the target user's team
    $query = "SELECT team_id, role, name FROM users WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $target_user_id]);
    $targetUser = $stmt->fetch();

    if (!$targetUser) {
        errorResponse('User not found', 404);
    }

    $team_id = $targetUser['team_id'];

    if (!$team_id) {
        errorResponse('User is not part of any team');
    }

    // Check if current user is a team admin of this team OR site admin
    $isTeamAdmin = $user['team_id'] == $team_id && $user['role'] === 'admin';
    $isSiteAdmin = $auth->isSiteAdmin($user);

    if (!$isTeamAdmin && !$isSiteAdmin) {
        errorResponse('Only team admins can remove members', 403);
    }

    // Prevent removing yourself if you're the only admin
    if ($target_user_id == $user['id']) {
        $query = "SELECT COUNT(*) as admin_count FROM users WHERE team_id = :team_id AND role = 'admin'";
        $stmt = $db->prepare($query);
        $stmt->execute([':team_id' => $team_id]);
        $adminCount = $stmt->fetch()['admin_count'];

        if ($adminCount <= 1) {
            errorResponse('Cannot remove yourself. You are the only team admin. Promote another member first or transfer ownership.');
        }
    }

    // Remove user from team
    $query = "UPDATE users SET team_id = NULL, role = NULL WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $target_user_id]);

    successResponse([], "Member '{$targetUser['name']}' removed from team");
}

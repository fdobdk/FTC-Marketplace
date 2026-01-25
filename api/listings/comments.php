<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/response.php';

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getComments($db);
        break;
    case 'POST':
        addComment($db, $auth);
        break;
    case 'DELETE':
        deleteComment($db, $auth);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

function getComments($db) {
    $listing_id = isset($_GET['listing_id']) ? intval($_GET['listing_id']) : 0;

    if (!$listing_id) {
        errorResponse('Listing ID is required', 400);
    }

    // Check if listing exists and is active
    $query = "SELECT id FROM listings WHERE id = :id AND status = 'active'";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $listing_id]);

    if (!$stmt->fetch()) {
        errorResponse('Listing not found', 404);
    }

    // Get comments with user info
    $query = "SELECT c.id, c.content, c.created_at, c.updated_at,
                     u.id as user_id, u.name as user_name, u.team_role,
                     t.team_number, t.name as team_name
              FROM listing_comments c
              JOIN users u ON c.user_id = u.id
              LEFT JOIN teams t ON u.team_id = t.id
              WHERE c.listing_id = :listing_id
              ORDER BY c.created_at ASC";

    $stmt = $db->prepare($query);
    $stmt->execute([':listing_id' => $listing_id]);
    $comments = $stmt->fetchAll();

    successResponse(['comments' => $comments]);
}

function addComment($db, $auth) {
    $user = $auth->getAuthenticatedUser();

    if (!$user) {
        errorResponse('Unauthorized', 401);
    }

    $data = json_decode(file_get_contents('php://input'), true);

    $listing_id = isset($data['listing_id']) ? intval($data['listing_id']) : 0;
    $content = isset($data['content']) ? trim($data['content']) : '';

    if (!$listing_id) {
        errorResponse('Listing ID is required', 400);
    }

    if (empty($content)) {
        errorResponse('Comment content is required', 400);
    }

    if (strlen($content) > 2000) {
        errorResponse('Comment is too long (max 2000 characters)', 400);
    }

    // Check if listing exists and is active
    $query = "SELECT id FROM listings WHERE id = :id AND status = 'active'";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $listing_id]);

    if (!$stmt->fetch()) {
        errorResponse('Listing not found', 404);
    }

    // Insert comment
    $query = "INSERT INTO listing_comments (listing_id, user_id, content) VALUES (:listing_id, :user_id, :content)";
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':listing_id' => $listing_id,
        ':user_id' => $user['id'],
        ':content' => $content
    ]);

    $comment_id = $db->lastInsertId();

    // Get the newly created comment with user info
    $query = "SELECT c.id, c.content, c.created_at, c.updated_at,
                     u.id as user_id, u.name as user_name, u.team_role,
                     t.team_number, t.name as team_name
              FROM listing_comments c
              JOIN users u ON c.user_id = u.id
              LEFT JOIN teams t ON u.team_id = t.id
              WHERE c.id = :id";

    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $comment_id]);
    $comment = $stmt->fetch();

    successResponse(['comment' => $comment], 'Comment added successfully');
}

function deleteComment($db, $auth) {
    $user = $auth->getAuthenticatedUser();

    if (!$user) {
        errorResponse('Unauthorized', 401);
    }

    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if (!$id) {
        errorResponse('Comment ID is required', 400);
    }

    // Check if comment exists and get owner
    $query = "SELECT user_id FROM listing_comments WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);
    $comment = $stmt->fetch();

    if (!$comment) {
        errorResponse('Comment not found', 404);
    }

    // Only allow deletion by comment owner or site admin
    $canDelete = ($comment['user_id'] == $user['id']) || $auth->isSiteAdmin($user);

    if (!$canDelete) {
        errorResponse('You do not have permission to delete this comment', 403);
    }

    // Delete comment
    $query = "DELETE FROM listing_comments WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);

    successResponse([], 'Comment deleted successfully');
}

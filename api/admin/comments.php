<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../utils/auth.php';
require_once '../utils/response.php';

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);

$user = $auth->getAuthenticatedUser();

if (!$user) {
    errorResponse('Unauthorized', 401);
}

if (!$auth->isSiteAdmin($user)) {
    errorResponse('Admin access required', 403);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getComments($db);
        break;
    case 'DELETE':
        deleteComment($db);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

function getComments($db) {
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? min(100, max(1, intval($_GET['limit']))) : 20;
    $offset = ($page - 1) * $limit;

    $listing_id = isset($_GET['listing_id']) ? intval($_GET['listing_id']) : null;
    $search = isset($_GET['search']) ? trim($_GET['search']) : null;

    $whereConditions = [];
    $params = [];

    if ($listing_id) {
        $whereConditions[] = "c.listing_id = :listing_id";
        $params[':listing_id'] = $listing_id;
    }

    if ($search) {
        $whereConditions[] = "(c.content LIKE :search OR u.name LIKE :search)";
        $params[':search'] = "%$search%";
    }

    $whereClause = count($whereConditions) > 0 ? "WHERE " . implode(" AND ", $whereConditions) : "";

    // Get total count
    $countQuery = "SELECT COUNT(*) as total FROM listing_comments c
                   JOIN users u ON c.user_id = u.id
                   $whereClause";
    $countStmt = $db->prepare($countQuery);
    $countStmt->execute($params);
    $total = $countStmt->fetch()['total'];

    // Get comments
    $query = "SELECT c.*,
                     u.name as user_name, u.email as user_email,
                     l.title as listing_title,
                     t.team_number, t.name as team_name
              FROM listing_comments c
              JOIN users u ON c.user_id = u.id
              JOIN listings l ON c.listing_id = l.id
              LEFT JOIN teams t ON u.team_id = t.id
              $whereClause
              ORDER BY c.created_at DESC
              LIMIT :limit OFFSET :offset";

    $stmt = $db->prepare($query);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $comments = $stmt->fetchAll();

    successResponse([
        'comments' => $comments,
        'pagination' => [
            'page' => $page,
            'limit' => $limit,
            'total' => intval($total),
            'total_pages' => ceil($total / $limit)
        ]
    ]);
}

function deleteComment($db) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if (!$id) {
        errorResponse('Comment ID is required');
    }

    // Check if comment exists
    $query = "SELECT id FROM listing_comments WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);

    if (!$stmt->fetch()) {
        errorResponse('Comment not found', 404);
    }

    // Delete the comment
    $query = "DELETE FROM listing_comments WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);

    successResponse([], 'Comment deleted successfully');
}

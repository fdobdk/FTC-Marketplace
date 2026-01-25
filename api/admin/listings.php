<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/response.php';

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
        getListings($db);
        break;
    case 'PUT':
        updateListing($db);
        break;
    case 'DELETE':
        deleteListing($db);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

function getListings($db) {
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? min(100, max(1, intval($_GET['limit']))) : 20;
    $offset = ($page - 1) * $limit;

    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $search = isset($_GET['search']) ? trim($_GET['search']) : null;

    $whereConditions = [];
    $params = [];

    if ($status && in_array($status, ['active', 'pending', 'closed', 'deleted'])) {
        $whereConditions[] = "l.status = :status";
        $params[':status'] = $status;
    }

    if ($search) {
        $whereConditions[] = "(l.title LIKE :search OR l.description LIKE :search OR t.team_number LIKE :search OR u.name LIKE :search)";
        $params[':search'] = "%$search%";
    }

    $whereClause = count($whereConditions) > 0 ? "WHERE " . implode(" AND ", $whereConditions) : "";

    // Get total count
    $countQuery = "SELECT COUNT(*) as total FROM listings l
                   JOIN teams t ON l.team_id = t.id
                   JOIN users u ON l.user_id = u.id
                   $whereClause";
    $countStmt = $db->prepare($countQuery);
    $countStmt->execute($params);
    $total = $countStmt->fetch()['total'];

    // Get listings
    $query = "SELECT l.*,
                     t.team_number, t.name as team_name, t.city, t.state,
                     u.name as user_name, u.email as user_email,
                     (SELECT COUNT(*) FROM listing_comments lc WHERE lc.listing_id = l.id) as comment_count,
                     (SELECT path FROM listing_images li WHERE li.listing_id = l.id AND li.is_primary = 1 LIMIT 1) as primary_image
              FROM listings l
              JOIN teams t ON l.team_id = t.id
              JOIN users u ON l.user_id = u.id
              $whereClause
              ORDER BY l.created_at DESC
              LIMIT :limit OFFSET :offset";

    $stmt = $db->prepare($query);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $listings = $stmt->fetchAll();

    successResponse([
        'listings' => $listings,
        'pagination' => [
            'page' => $page,
            'limit' => $limit,
            'total' => intval($total),
            'total_pages' => ceil($total / $limit)
        ]
    ]);
}

function updateListing($db) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        errorResponse('Listing ID is required');
    }

    $id = intval($data['id']);

    // Check if listing exists
    $query = "SELECT id FROM listings WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);

    if (!$stmt->fetch()) {
        errorResponse('Listing not found', 404);
    }

    $fields = [];
    $params = [':id' => $id];

    if (isset($data['title'])) {
        $fields[] = 'title = :title';
        $params[':title'] = trim($data['title']);
    }

    if (isset($data['description'])) {
        $fields[] = 'description = :description';
        $params[':description'] = trim($data['description']);
    }

    if (isset($data['type']) && in_array($data['type'], ['have', 'want'])) {
        $fields[] = 'type = :type';
        $params[':type'] = $data['type'];
    }

    if (isset($data['category'])) {
        $fields[] = 'category = :category';
        $params[':category'] = $data['category'];
    }

    if (isset($data['condition'])) {
        $fields[] = '`condition` = :condition';
        $params[':condition'] = $data['condition'];
    }

    if (isset($data['quantity'])) {
        $fields[] = 'quantity = :quantity';
        $params[':quantity'] = intval($data['quantity']);
    }

    if (isset($data['payment_type']) && in_array($data['payment_type'], ['cash', 'trade', 'either'])) {
        $fields[] = 'payment_type = :payment_type';
        $params[':payment_type'] = $data['payment_type'];
    }

    if (isset($data['status']) && in_array($data['status'], ['active', 'pending', 'closed', 'deleted'])) {
        $fields[] = 'status = :status';
        $params[':status'] = $data['status'];
    }

    if (empty($fields)) {
        errorResponse('No fields to update');
    }

    $query = "UPDATE listings SET " . implode(', ', $fields) . " WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute($params);

    // Get updated listing
    $query = "SELECT l.*, t.team_number, t.name as team_name, u.name as user_name
              FROM listings l
              JOIN teams t ON l.team_id = t.id
              JOIN users u ON l.user_id = u.id
              WHERE l.id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);
    $listing = $stmt->fetch();

    successResponse(['listing' => $listing], 'Listing updated successfully');
}

function deleteListing($db) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if (!$id) {
        errorResponse('Listing ID is required');
    }

    // Check if listing exists
    $query = "SELECT id FROM listings WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);

    if (!$stmt->fetch()) {
        errorResponse('Listing not found', 404);
    }

    // Hard delete the listing (admin action)
    $query = "DELETE FROM listings WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);

    successResponse([], 'Listing permanently deleted');
}

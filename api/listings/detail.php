<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/response.php';

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);

$listing_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if (!$listing_id) {
    errorResponse('Listing ID is required', 400);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getListing($db, $listing_id);
        break;
    case 'PUT':
        updateListing($db, $auth, $listing_id);
        break;
    case 'DELETE':
        deleteListing($db, $auth, $listing_id);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

function getListing($db, $id) {
    $query = "SELECT l.*, t.team_number, t.name as team_name, t.city, t.state, t.contact_email as team_contact_email,
                     u.name as user_name, u.contact_email as user_contact_email,
                     u.contact_phone as user_contact_phone, u.contact_discord as user_contact_discord
              FROM listings l
              JOIN teams t ON l.team_id = t.id
              JOIN users u ON l.user_id = u.id
              WHERE l.id = :id AND l.status = 'active'";

    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);
    $listing = $stmt->fetch();

    if (!$listing) {
        errorResponse('Listing not found', 404);
    }

    // Get all images for this listing
    $imgQuery = "SELECT id, filename, path, is_primary FROM listing_images WHERE listing_id = :listing_id ORDER BY is_primary DESC, created_at ASC";
    $imgStmt = $db->prepare($imgQuery);
    $imgStmt->execute([':listing_id' => $id]);
    $listing['images'] = $imgStmt->fetchAll();

    // Set primary_image for convenience
    $listing['primary_image'] = null;
    foreach ($listing['images'] as $img) {
        if ($img['is_primary']) {
            $listing['primary_image'] = $img['path'];
            break;
        }
    }

    successResponse(['listing' => $listing]);
}

function updateListing($db, $auth, $id) {
    $user = $auth->getAuthenticatedUser();

    if (!$user) {
        errorResponse('Unauthorized', 401);
    }

    // Check if user owns the listing
    $query = "SELECT user_id, team_id FROM listings WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);
    $listing = $stmt->fetch();

    if (!$listing) {
        errorResponse('Listing not found', 404);
    }

    // Allow update if user is on the same team
    $canEdit = ($listing['team_id'] == $user['team_id']);

    if (!$canEdit) {
        errorResponse('You do not have permission to edit this listing', 403);
    }

    $data = json_decode(file_get_contents('php://input'), true);

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

    if (isset($data['status']) && in_array($data['status'], ['active', 'pending', 'closed'])) {
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
    $query = "SELECT l.*, t.team_number, t.name as team_name, t.city, t.state
              FROM listings l
              JOIN teams t ON l.team_id = t.id
              WHERE l.id = :id";

    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);
    $listing = $stmt->fetch();

    successResponse(['listing' => $listing], 'Listing updated successfully');
}

function deleteListing($db, $auth, $id) {
    $user = $auth->getAuthenticatedUser();

    if (!$user) {
        errorResponse('Unauthorized', 401);
    }

    // Check if user owns the listing
    $query = "SELECT user_id, team_id FROM listings WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);
    $listing = $stmt->fetch();

    if (!$listing) {
        errorResponse('Listing not found', 404);
    }

    // Allow delete if user owns the listing or is team admin
    $canDelete = ($listing['user_id'] == $user['id']) ||
                 ($listing['team_id'] == $user['team_id'] && $user['role'] == 'admin');

    if (!$canDelete) {
        errorResponse('You do not have permission to delete this listing', 403);
    }

    // Soft delete
    $query = "UPDATE listings SET status = 'deleted' WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $id]);

    successResponse([], 'Listing deleted successfully');
}

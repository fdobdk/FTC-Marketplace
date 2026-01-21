<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../utils/auth.php';
require_once '../utils/response.php';

$database = new Database();
$db = $database->getConnection();

$listing_id = isset($_GET['listing_id']) ? intval($_GET['listing_id']) : 0;

if (!$listing_id) {
    errorResponse('Listing ID is required', 400);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getImages($db, $listing_id);
        break;
    case 'DELETE':
        deleteImage($db, $listing_id);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

function getImages($db, $listing_id) {
    $query = "SELECT * FROM listing_images WHERE listing_id = :listing_id ORDER BY is_primary DESC, created_at ASC";
    $stmt = $db->prepare($query);
    $stmt->execute([':listing_id' => $listing_id]);
    $images = $stmt->fetchAll();

    successResponse(['images' => $images]);
}

function deleteImage($db, $listing_id) {
    global $database;
    $auth = new Auth($db);
    $user = $auth->getAuthenticatedUser();

    if (!$user) {
        errorResponse('Unauthorized', 401);
    }

    $image_id = isset($_GET['image_id']) ? intval($_GET['image_id']) : 0;

    if (!$image_id) {
        errorResponse('Image ID is required');
    }

    // Get image and listing info
    $query = "SELECT li.*, l.user_id, l.team_id
              FROM listing_images li
              JOIN listings l ON li.listing_id = l.id
              WHERE li.id = :id AND li.listing_id = :listing_id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $image_id, ':listing_id' => $listing_id]);
    $image = $stmt->fetch();

    if (!$image) {
        errorResponse('Image not found', 404);
    }

    // Check permission
    $canDelete = ($image['user_id'] == $user['id']) ||
                 ($image['team_id'] == $user['team_id'] && $user['role'] == 'admin');

    if (!$canDelete) {
        errorResponse('You do not have permission to delete this image', 403);
    }

    // Delete file from disk
    $file_path = '../../' . ltrim($image['path'], '/');
    if (file_exists($file_path)) {
        unlink($file_path);
    }

    // Delete from database
    $query = "DELETE FROM listing_images WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $image_id]);

    // If deleted image was primary, make another one primary
    if ($image['is_primary']) {
        $query = "UPDATE listing_images SET is_primary = 1
                  WHERE listing_id = :listing_id
                  ORDER BY created_at ASC LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->execute([':listing_id' => $listing_id]);
    }

    successResponse([], 'Image deleted successfully');
}

<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../utils/auth.php';
require_once '../utils/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Method not allowed', 405);
}

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);

$user = $auth->getAuthenticatedUser();

if (!$user) {
    errorResponse('Unauthorized', 401);
}

// Check if listing_id is provided
$listing_id = isset($_POST['listing_id']) ? intval($_POST['listing_id']) : 0;

if (!$listing_id) {
    errorResponse('Listing ID is required');
}

// Verify user owns the listing
$query = "SELECT user_id, team_id FROM listings WHERE id = :id";
$stmt = $db->prepare($query);
$stmt->execute([':id' => $listing_id]);
$listing = $stmt->fetch();

if (!$listing) {
    errorResponse('Listing not found', 404);
}

$canUpload = ($listing['user_id'] == $user['id']) ||
             ($listing['team_id'] == $user['team_id'] && $user['role'] == 'admin');

if (!$canUpload) {
    errorResponse('You do not have permission to upload images to this listing', 403);
}

// Check if file was uploaded
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    $error_messages = [
        UPLOAD_ERR_INI_SIZE => 'File too large (server limit)',
        UPLOAD_ERR_FORM_SIZE => 'File too large (form limit)',
        UPLOAD_ERR_PARTIAL => 'File only partially uploaded',
        UPLOAD_ERR_NO_FILE => 'No file uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing temp folder',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file',
        UPLOAD_ERR_EXTENSION => 'Upload blocked by extension'
    ];
    $error_code = $_FILES['image']['error'] ?? UPLOAD_ERR_NO_FILE;
    errorResponse($error_messages[$error_code] ?? 'Upload failed');
}

$file = $_FILES['image'];

// Validate file type
$allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime_type = $finfo->file($file['tmp_name']);

if (!in_array($mime_type, $allowed_types)) {
    errorResponse('Invalid file type. Allowed: JPG, PNG, GIF, WEBP');
}

// Validate file size (max 5MB)
$max_size = 5 * 1024 * 1024;
if ($file['size'] > $max_size) {
    errorResponse('File too large. Maximum size is 5MB');
}

// Generate unique filename
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = 'listing_' . $listing_id . '_' . uniqid() . '.' . strtolower($extension);

// Upload directory
$upload_dir = '../../uploads/listings/';
$upload_path = $upload_dir . $filename;

// Create directory if it doesn't exist
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

// Move uploaded file
if (!move_uploaded_file($file['tmp_name'], $upload_path)) {
    errorResponse('Failed to save uploaded file', 500);
}

// Check if this is the first image (make it primary)
$query = "SELECT COUNT(*) as count FROM listing_images WHERE listing_id = :listing_id";
$stmt = $db->prepare($query);
$stmt->execute([':listing_id' => $listing_id]);
$result = $stmt->fetch();
$is_primary = ($result['count'] == 0);

// Save to database
$relative_path = '/uploads/listings/' . $filename;

$query = "INSERT INTO listing_images (listing_id, filename, path, is_primary)
          VALUES (:listing_id, :filename, :path, :is_primary)";
$stmt = $db->prepare($query);
$stmt->execute([
    ':listing_id' => $listing_id,
    ':filename' => $filename,
    ':path' => $relative_path,
    ':is_primary' => $is_primary
]);

$image_id = $db->lastInsertId();

successResponse([
    'image' => [
        'id' => $image_id,
        'filename' => $filename,
        'path' => $relative_path,
        'is_primary' => $is_primary
    ]
], 'Image uploaded successfully');

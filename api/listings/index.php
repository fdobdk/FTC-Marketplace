<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../utils/auth.php';
require_once '../utils/response.php';

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getListings($db);
        break;
    case 'POST':
        createListing($db, $auth);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

function getListings($db) {
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    $state = isset($_GET['state']) ? $_GET['state'] : null;
    $team_id = isset($_GET['team_id']) ? intval($_GET['team_id']) : null;
    $search = isset($_GET['search']) ? $_GET['search'] : null;

    $query = "SELECT l.*, t.team_number, t.name as team_name, t.city, t.state, t.contact_email,
                     u.name as user_name,
                     (SELECT path FROM listing_images li WHERE li.listing_id = l.id AND li.is_primary = 1 LIMIT 1) as primary_image
              FROM listings l
              JOIN teams t ON l.team_id = t.id
              JOIN users u ON l.user_id = u.id
              WHERE l.status = 'active'";

    $params = [];

    if ($type) {
        $query .= " AND l.type = :type";
        $params[':type'] = $type;
    }

    if ($category) {
        $query .= " AND l.category = :category";
        $params[':category'] = $category;
    }

    if ($state) {
        $query .= " AND t.state = :state";
        $params[':state'] = $state;
    }

    if ($team_id) {
        $query .= " AND l.team_id = :team_id";
        $params[':team_id'] = $team_id;
    }

    if ($search) {
        $query .= " AND (l.title LIKE :search OR l.description LIKE :search2)";
        $params[':search'] = "%$search%";
        $params[':search2'] = "%$search%";
    }

    $query .= " ORDER BY l.created_at DESC";

    $stmt = $db->prepare($query);
    $stmt->execute($params);
    $listings = $stmt->fetchAll();

    successResponse(['listings' => $listings]);
}

function createListing($db, $auth) {
    $user = $auth->getAuthenticatedUser();

    if (!$user) {
        errorResponse('Unauthorized', 401);
    }

    if (!$user['team_id']) {
        errorResponse('You must be part of a team to create listings');
    }

    $data = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (empty($data['title']) || empty($data['description']) || empty($data['type']) || empty($data['category'])) {
        errorResponse('Title, description, type, and category are required');
    }

    $title = trim($data['title']);
    $description = trim($data['description']);
    $type = $data['type'];
    $category = $data['category'];
    $condition = isset($data['condition']) ? $data['condition'] : null;
    $quantity = isset($data['quantity']) ? intval($data['quantity']) : 1;
    $payment_type = isset($data['payment_type']) ? $data['payment_type'] : 'either';

    // Validate type
    if (!in_array($type, ['have', 'want'])) {
        errorResponse('Invalid listing type');
    }

    // Validate payment_type
    if (!in_array($payment_type, ['cash', 'trade', 'either'])) {
        $payment_type = 'either';
    }

    // Create listing
    $query = "INSERT INTO listings (user_id, team_id, title, description, type, category, `condition`, quantity, payment_type)
              VALUES (:user_id, :team_id, :title, :description, :type, :category, :condition, :quantity, :payment_type)";

    $stmt = $db->prepare($query);
    $stmt->execute([
        ':user_id' => $user['id'],
        ':team_id' => $user['team_id'],
        ':title' => $title,
        ':description' => $description,
        ':type' => $type,
        ':category' => $category,
        ':condition' => $condition,
        ':quantity' => $quantity,
        ':payment_type' => $payment_type
    ]);

    $listing_id = $db->lastInsertId();

    // Get full listing with team info
    $query = "SELECT l.*, t.team_number, t.name as team_name, t.city, t.state
              FROM listings l
              JOIN teams t ON l.team_id = t.id
              WHERE l.id = :id";

    $stmt = $db->prepare($query);
    $stmt->execute([':id' => $listing_id]);
    $listing = $stmt->fetch();

    successResponse(['listing' => $listing], 'Listing created successfully');
}

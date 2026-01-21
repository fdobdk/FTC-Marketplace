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

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    errorResponse('Method not allowed', 405);
}

try {
    // Get total counts
    $stats = [];

    // Total users
    $stmt = $db->query("SELECT COUNT(*) as count FROM users");
    $stats['total_users'] = intval($stmt->fetch()['count']);

    // Total teams
    $stmt = $db->query("SELECT COUNT(*) as count FROM teams");
    $stats['total_teams'] = intval($stmt->fetch()['count']);

    // Total listings by status
    $stmt = $db->query("SELECT status, COUNT(*) as count FROM listings GROUP BY status");
    $listingsByStatus = [];
    while ($row = $stmt->fetch()) {
        $listingsByStatus[$row['status']] = intval($row['count']);
    }
    $stats['listings_by_status'] = $listingsByStatus;
    $stats['total_listings'] = array_sum($listingsByStatus);
    $stats['active_listings'] = $listingsByStatus['active'] ?? 0;

    // Total comments
    $stmt = $db->query("SELECT COUNT(*) as count FROM listing_comments");
    $stats['total_comments'] = intval($stmt->fetch()['count']);

    // Recent activity (last 7 days)
    $stmt = $db->query("SELECT COUNT(*) as count FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
    $stats['new_users_7d'] = intval($stmt->fetch()['count']);

    $stmt = $db->query("SELECT COUNT(*) as count FROM listings WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
    $stats['new_listings_7d'] = intval($stmt->fetch()['count']);

    // Listings by type
    $stmt = $db->query("SELECT type, COUNT(*) as count FROM listings WHERE status = 'active' GROUP BY type");
    $listingsByType = [];
    while ($row = $stmt->fetch()) {
        $listingsByType[$row['type']] = intval($row['count']);
    }
    $stats['listings_by_type'] = $listingsByType;

    // Listings by category
    $stmt = $db->query("SELECT category, COUNT(*) as count FROM listings WHERE status = 'active' GROUP BY category ORDER BY count DESC LIMIT 10");
    $listingsByCategory = [];
    while ($row = $stmt->fetch()) {
        $listingsByCategory[$row['category']] = intval($row['count']);
    }
    $stats['listings_by_category'] = $listingsByCategory;

    successResponse(['stats' => $stats]);

} catch (Exception $e) {
    errorResponse('Error fetching stats: ' . $e->getMessage(), 500);
}

-- FTC Marketplace - Railway Database Setup
-- Run this entire script in Railway's MySQL Data tab or via MySQL client
-- Railway uses 'railway' as the default database name

-- =====================================================
-- PART 1: Core Tables
-- =====================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    team_id INT DEFAULT NULL,
    role ENUM('admin', 'member') DEFAULT 'member',
    contact_email VARCHAR(255) DEFAULT NULL,
    contact_phone VARCHAR(20) DEFAULT NULL,
    contact_discord VARCHAR(100) DEFAULT NULL,
    team_role VARCHAR(50) DEFAULT NULL,
    team_status ENUM('active', 'alumni', 'mentor') DEFAULT 'active',
    bio TEXT DEFAULT NULL,
    graduation_year INT DEFAULT NULL,
    specialties VARCHAR(255) DEFAULT NULL,
    is_site_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_team_id (team_id),
    INDEX idx_site_admin (is_site_admin)
) ENGINE=InnoDB;

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_number VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    created_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_team_number (team_number),
    INDEX idx_state (state),
    INDEX idx_city_state (city, state)
) ENGINE=InnoDB;

-- Add foreign key for users.team_id (only if not exists)
SET @fk_exists = (
    SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS
    WHERE CONSTRAINT_NAME = 'fk_users_team' AND TABLE_NAME = 'users'
);
SET @sql = IF(@fk_exists = 0,
    'ALTER TABLE users ADD CONSTRAINT fk_users_team FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL',
    'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Listings table
CREATE TABLE IF NOT EXISTS listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    type ENUM('have', 'want') NOT NULL,
    category VARCHAR(50) NOT NULL,
    `condition` VARCHAR(50) DEFAULT NULL,
    quantity INT DEFAULT 1,
    payment_type ENUM('cash', 'trade', 'either') DEFAULT 'either',
    status ENUM('active', 'pending', 'closed', 'deleted') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    INDEX idx_type (type),
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_team_id (team_id),
    FULLTEXT idx_search (title, description)
) ENGINE=InnoDB;

-- Listing images table
CREATE TABLE IF NOT EXISTS listing_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    path VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Session tokens table
CREATE TABLE IF NOT EXISTS auth_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB;

-- Listing comments table
CREATE TABLE IF NOT EXISTS listing_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_listing_id (listing_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB;

-- =====================================================
-- PART 2: Views
-- =====================================================

-- View: Listings with team info (active only)
DROP VIEW IF EXISTS v_listings;
CREATE VIEW v_listings AS
SELECT
    l.*,
    t.team_number,
    t.name AS team_name,
    t.city,
    t.state,
    t.contact_email AS team_contact_email,
    u.name AS user_name,
    u.contact_email AS user_contact_email,
    u.contact_phone AS user_contact_phone,
    u.contact_discord AS user_contact_discord,
    u.team_role AS user_team_role,
    u.team_status AS user_team_status,
    (SELECT path FROM listing_images li WHERE li.listing_id = l.id AND li.is_primary = 1 LIMIT 1) AS primary_image
FROM listings l
JOIN teams t ON l.team_id = t.id
JOIN users u ON l.user_id = u.id
WHERE l.status = 'active';

-- View: Teams with member counts
DROP VIEW IF EXISTS v_teams;
CREATE VIEW v_teams AS
SELECT
    t.*,
    COUNT(DISTINCT u.id) AS members_count,
    COUNT(DISTINCT l.id) AS listings_count
FROM teams t
LEFT JOIN users u ON u.team_id = t.id
LEFT JOIN listings l ON l.team_id = t.id AND l.status = 'active'
GROUP BY t.id;

-- View: Comments with user info
DROP VIEW IF EXISTS v_listing_comments;
CREATE VIEW v_listing_comments AS
SELECT
    c.*,
    u.name AS user_name,
    u.team_id,
    u.team_role,
    t.team_number,
    t.name AS team_name
FROM listing_comments c
JOIN users u ON c.user_id = u.id
LEFT JOIN teams t ON u.team_id = t.id;

-- View: Admin listings (all statuses)
DROP VIEW IF EXISTS v_admin_listings;
CREATE VIEW v_admin_listings AS
SELECT
    l.*,
    t.team_number,
    t.name AS team_name,
    t.city,
    t.state,
    t.contact_email AS team_contact_email,
    u.name AS user_name,
    u.email AS user_email,
    u.contact_email AS user_contact_email,
    u.contact_phone AS user_contact_phone,
    u.contact_discord AS user_contact_discord,
    (SELECT COUNT(*) FROM listing_comments lc WHERE lc.listing_id = l.id) AS comment_count,
    (SELECT path FROM listing_images li WHERE li.listing_id = l.id AND li.is_primary = 1 LIMIT 1) AS primary_image
FROM listings l
JOIN teams t ON l.team_id = t.id
JOIN users u ON l.user_id = u.id;

-- =====================================================
-- DONE! Your database is ready.
-- =====================================================

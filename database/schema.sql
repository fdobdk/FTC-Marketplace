-- FTC Marketplace Database Schema
-- Run this in phpMyAdmin or MySQL command line

-- Create database
CREATE DATABASE IF NOT EXISTS ftc_marketplace CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ftc_marketplace;

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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_team_id (team_id)
) ENGINE=InnoDB;

-- Teams table (created_by is nullable to avoid circular dependency issues)
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

-- Add foreign key for users.team_id
ALTER TABLE users
ADD CONSTRAINT fk_users_team
FOREIGN KEY (team_id) REFERENCES teams(id)
ON DELETE SET NULL;

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

-- Listing images table (for future use)
CREATE TABLE IF NOT EXISTS listing_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    path VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Session tokens table (for authentication)
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

-- Views for commonly used queries

-- View: Listings with team info
CREATE OR REPLACE VIEW v_listings AS
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
    (SELECT path FROM listing_images li WHERE li.listing_id = l.id AND li.is_primary = 1 LIMIT 1) AS primary_image
FROM listings l
JOIN teams t ON l.team_id = t.id
JOIN users u ON l.user_id = u.id
WHERE l.status = 'active';

-- View: Teams with member counts
CREATE OR REPLACE VIEW v_teams AS
SELECT
    t.*,
    COUNT(DISTINCT u.id) AS members_count,
    COUNT(DISTINCT l.id) AS listings_count
FROM teams t
LEFT JOIN users u ON u.team_id = t.id
LEFT JOIN listings l ON l.team_id = t.id AND l.status = 'active'
GROUP BY t.id;

-- Insert sample data for testing (optional)
-- Uncomment below to add test data

/*
-- Sample user (password is 'password123' hashed with bcrypt)
INSERT INTO users (name, email, password) VALUES
('Test User', 'test@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Sample team
INSERT INTO teams (team_number, name, description, city, state, contact_email, created_by) VALUES
('12345', 'TechBots', 'A competitive FTC robotics team', 'San Jose', 'CA', 'techbots@example.com', 1);

-- Update user to be in team
UPDATE users SET team_id = 1, role = 'admin' WHERE id = 1;

-- Sample listings
INSERT INTO listings (user_id, team_id, title, description, type, category, `condition`, quantity) VALUES
(1, 1, 'REV Robotics HD Hex Motor', 'Barely used HD Hex motors from last season. Work perfectly.', 'have', 'motors', 'like-new', 2),
(1, 1, 'Looking for GoBuilda Wheels', 'Need 4x 96mm mecanum wheels for our drivetrain.', 'want', 'drivetrain', NULL, 4);
*/

-- Migration: Add user profile customization and admin features
-- Run this migration to add team role/status fields and site-wide admin capabilities

USE ftc_marketplace;

-- Add new profile fields to users table
ALTER TABLE users
ADD COLUMN team_role VARCHAR(50) DEFAULT NULL COMMENT 'Role on the FTC team (e.g., Captain, Driver, Programmer)',
ADD COLUMN team_status ENUM('active', 'alumni', 'mentor') DEFAULT 'active' COMMENT 'Status on the team',
ADD COLUMN bio TEXT DEFAULT NULL COMMENT 'User biography/description',
ADD COLUMN graduation_year INT DEFAULT NULL COMMENT 'Expected or actual graduation year',
ADD COLUMN specialties VARCHAR(255) DEFAULT NULL COMMENT 'Areas of expertise (comma-separated)',
ADD COLUMN is_site_admin BOOLEAN DEFAULT FALSE COMMENT 'Site-wide administrator privileges';

-- Create index for site admins
CREATE INDEX idx_site_admin ON users(is_site_admin);

-- Create comments table for listing comments
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

-- Create view for comments with user info
CREATE OR REPLACE VIEW v_listing_comments AS
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

-- Update v_listings view to include new user profile fields
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
    u.team_role AS user_team_role,
    u.team_status AS user_team_status,
    (SELECT path FROM listing_images li WHERE li.listing_id = l.id AND li.is_primary = 1 LIMIT 1) AS primary_image
FROM listings l
JOIN teams t ON l.team_id = t.id
JOIN users u ON l.user_id = u.id
WHERE l.status = 'active';

-- Create admin view for all listings (including non-active)
CREATE OR REPLACE VIEW v_admin_listings AS
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

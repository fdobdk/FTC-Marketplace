-- Migration: Add payment type to listings and contact fields to users
-- Run this on existing databases to add the new fields

-- Add contact fields to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255) DEFAULT NULL AFTER role,
ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(20) DEFAULT NULL AFTER contact_email,
ADD COLUMN IF NOT EXISTS contact_discord VARCHAR(100) DEFAULT NULL AFTER contact_phone;

-- Add payment_type to listings table
ALTER TABLE listings
ADD COLUMN IF NOT EXISTS payment_type ENUM('cash', 'trade', 'either') DEFAULT 'either' AFTER quantity;

-- Update status enum to include 'pending' for in-progress transactions
ALTER TABLE listings
MODIFY COLUMN status ENUM('active', 'pending', 'closed', 'deleted') DEFAULT 'active';

-- Update the v_listings view to include new fields
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
    (SELECT path FROM listing_images li WHERE li.listing_id = l.id AND li.is_primary = 1 LIMIT 1) AS primary_image
FROM listings l
JOIN teams t ON l.team_id = t.id
JOIN users u ON l.user_id = u.id
WHERE l.status = 'active';

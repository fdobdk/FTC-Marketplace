-- Migration: Add email encryption support
-- This adds an email_hash column for searchable lookups of encrypted emails

-- Add email_hash column to users table
ALTER TABLE users ADD COLUMN email_hash VARCHAR(64) DEFAULT NULL AFTER email;
ALTER TABLE users ADD INDEX idx_email_hash (email_hash);

-- Add email_hash column to teams table (for contact_email)
ALTER TABLE teams ADD COLUMN contact_email_hash VARCHAR(64) DEFAULT NULL AFTER contact_email;

-- Note: After running this migration, run the PHP migration script
-- to encrypt existing emails and populate the hash columns:
-- php api/migrations/encrypt_emails.php

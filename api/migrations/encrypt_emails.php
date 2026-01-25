<?php
/**
 * Migration script to encrypt existing emails in the database
 *
 * Run this script after adding the email_hash column to the users table:
 * ALTER TABLE users ADD COLUMN email_hash VARCHAR(64) DEFAULT NULL AFTER email;
 * ALTER TABLE users ADD INDEX idx_email_hash (email_hash);
 *
 * Usage: php encrypt_emails.php
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/encryption.php';

echo "=== Email Encryption Migration ===\n\n";

try {
    $database = new Database();
    $db = $database->getConnection();
    $encryption = new Encryption();

    // Check if email_hash column exists
    $stmt = $db->query("SHOW COLUMNS FROM users LIKE 'email_hash'");
    if ($stmt->rowCount() === 0) {
        echo "ERROR: email_hash column does not exist.\n";
        echo "Please run the SQL migration first:\n";
        echo "  ALTER TABLE users ADD COLUMN email_hash VARCHAR(64) DEFAULT NULL AFTER email;\n";
        echo "  ALTER TABLE users ADD INDEX idx_email_hash (email_hash);\n";
        exit(1);
    }

    // Get all users
    $stmt = $db->query("SELECT id, email, contact_email FROM users");
    $users = $stmt->fetchAll();

    echo "Found " . count($users) . " users to process.\n\n";

    $migrated = 0;
    $skipped = 0;
    $errors = 0;

    $db->beginTransaction();

    foreach ($users as $user) {
        try {
            $email = $user['email'];
            $contactEmail = $user['contact_email'];

            // Check if email is already encrypted (doesn't contain @)
            if (!$encryption->isEncrypted($email) && strpos($email, '@') !== false) {
                // Email is not encrypted, encrypt it
                $encryptedEmail = $encryption->encrypt($email);
                $emailHash = $encryption->hashForSearch($email);

                // Encrypt contact email if present
                $encryptedContactEmail = null;
                if ($contactEmail && strpos($contactEmail, '@') !== false) {
                    $encryptedContactEmail = $encryption->encrypt($contactEmail);
                }

                $updateQuery = "UPDATE users SET email = :email, email_hash = :email_hash, contact_email = :contact_email WHERE id = :id";
                $updateStmt = $db->prepare($updateQuery);
                $updateStmt->execute([
                    ':email' => $encryptedEmail,
                    ':email_hash' => $emailHash,
                    ':contact_email' => $encryptedContactEmail,
                    ':id' => $user['id']
                ]);

                echo "  Migrated user ID {$user['id']}: {$email}\n";
                $migrated++;
            } else {
                echo "  Skipped user ID {$user['id']} (already encrypted or invalid)\n";
                $skipped++;
            }
        } catch (Exception $e) {
            echo "  ERROR migrating user ID {$user['id']}: " . $e->getMessage() . "\n";
            $errors++;
        }
    }

    if ($errors === 0) {
        $db->commit();
        echo "\n=== Migration Complete ===\n";
        echo "Migrated: $migrated\n";
        echo "Skipped: $skipped\n";
        echo "Errors: $errors\n";
    } else {
        $db->rollBack();
        echo "\n=== Migration FAILED - Rolled Back ===\n";
        echo "Errors: $errors\n";
        echo "Please fix the errors and run again.\n";
        exit(1);
    }

    // Also migrate team contact emails
    echo "\n=== Migrating Team Contact Emails ===\n";

    // Check if contact_email_hash column exists
    $stmt = $db->query("SHOW COLUMNS FROM teams LIKE 'contact_email_hash'");
    $hasTeamEmailHash = $stmt->rowCount() > 0;

    $stmt = $db->query("SELECT id, contact_email FROM teams");
    $teams = $stmt->fetchAll();

    echo "Found " . count($teams) . " teams to process.\n\n";

    $teamMigrated = 0;
    $teamSkipped = 0;

    $db->beginTransaction();

    foreach ($teams as $team) {
        $contactEmail = $team['contact_email'];

        if ($contactEmail && !$encryption->isEncrypted($contactEmail) && strpos($contactEmail, '@') !== false) {
            $encryptedEmail = $encryption->encrypt($contactEmail);

            if ($hasTeamEmailHash) {
                $emailHash = $encryption->hashForSearch($contactEmail);
                $updateQuery = "UPDATE teams SET contact_email = :email, contact_email_hash = :email_hash WHERE id = :id";
                $updateStmt = $db->prepare($updateQuery);
                $updateStmt->execute([
                    ':email' => $encryptedEmail,
                    ':email_hash' => $emailHash,
                    ':id' => $team['id']
                ]);
            } else {
                $updateQuery = "UPDATE teams SET contact_email = :email WHERE id = :id";
                $updateStmt = $db->prepare($updateQuery);
                $updateStmt->execute([
                    ':email' => $encryptedEmail,
                    ':id' => $team['id']
                ]);
            }

            echo "  Migrated team ID {$team['id']}\n";
            $teamMigrated++;
        } else {
            echo "  Skipped team ID {$team['id']} (already encrypted or invalid)\n";
            $teamSkipped++;
        }
    }

    $db->commit();

    echo "\n=== Team Migration Complete ===\n";
    echo "Migrated: $teamMigrated\n";
    echo "Skipped: $teamSkipped\n";

    echo "\n=== All Migrations Complete! ===\n";
    echo "\nIMPORTANT: Make sure to set the ENCRYPTION_KEY environment variable in production!\n";
    echo "Generate a secure key with: php -r \"echo bin2hex(random_bytes(32));\" \n";

} catch (Exception $e) {
    echo "Fatal error: " . $e->getMessage() . "\n";
    exit(1);
}

<?php
/**
 * Encryption utility for sensitive data like emails
 * Uses AES-256-CBC encryption with a key stored in environment variables
 */
class Encryption {
    private $cipher = 'aes-256-cbc';
    private $key;

    public function __construct() {
        // Get encryption key from environment variable
        // For development, we use a default key - in production, always use env var
        $envKey = $this->getEnvVar('ENCRYPTION_KEY');

        if ($envKey) {
            // Hash the key to ensure it's the correct length for AES-256
            $this->key = hash('sha256', $envKey, true);
        } else {
            // Default key for development - CHANGE THIS IN PRODUCTION
            // Generate a secure key: bin2hex(random_bytes(32))
            $this->key = hash('sha256', 'ftc-marketplace-dev-key-change-in-production', true);
        }
    }

    private function getEnvVar($name, $default = null) {
        if (getenv($name) !== false) {
            return getenv($name);
        }
        if (isset($_ENV[$name])) {
            return $_ENV[$name];
        }
        if (isset($_SERVER[$name])) {
            return $_SERVER[$name];
        }
        return $default;
    }

    /**
     * Encrypt a string
     * @param string $data The data to encrypt
     * @return string Base64 encoded encrypted data with IV prepended
     */
    public function encrypt($data) {
        if (empty($data)) {
            return $data;
        }

        // Generate a random initialization vector
        $ivLength = openssl_cipher_iv_length($this->cipher);
        $iv = openssl_random_pseudo_bytes($ivLength);

        // Encrypt the data
        $encrypted = openssl_encrypt($data, $this->cipher, $this->key, OPENSSL_RAW_DATA, $iv);

        if ($encrypted === false) {
            throw new Exception('Encryption failed');
        }

        // Prepend IV to encrypted data and base64 encode
        return base64_encode($iv . $encrypted);
    }

    /**
     * Decrypt a string
     * @param string $encryptedData Base64 encoded encrypted data with IV prepended
     * @return string The decrypted data
     */
    public function decrypt($encryptedData) {
        if (empty($encryptedData)) {
            return $encryptedData;
        }

        // Check if data looks like it's encrypted (base64 with certain length)
        // This helps handle legacy unencrypted data
        if (!$this->isEncrypted($encryptedData)) {
            return $encryptedData;
        }

        try {
            // Decode from base64
            $data = base64_decode($encryptedData, true);

            if ($data === false) {
                return $encryptedData; // Return as-is if not valid base64
            }

            // Extract IV and encrypted data
            $ivLength = openssl_cipher_iv_length($this->cipher);

            if (strlen($data) < $ivLength) {
                return $encryptedData; // Return as-is if too short
            }

            $iv = substr($data, 0, $ivLength);
            $encrypted = substr($data, $ivLength);

            // Decrypt
            $decrypted = openssl_decrypt($encrypted, $this->cipher, $this->key, OPENSSL_RAW_DATA, $iv);

            if ($decrypted === false) {
                return $encryptedData; // Return as-is if decryption fails
            }

            return $decrypted;
        } catch (Exception $e) {
            return $encryptedData; // Return as-is on any error
        }
    }

    /**
     * Check if a string appears to be encrypted
     * @param string $data The data to check
     * @return bool True if the data appears to be encrypted
     */
    public function isEncrypted($data) {
        if (empty($data)) {
            return false;
        }

        // Encrypted data should be base64 and have a minimum length
        // (IV length + at least some encrypted data)
        $ivLength = openssl_cipher_iv_length($this->cipher);
        $minLength = base64_encode(str_repeat('x', $ivLength + 1));

        // Check if it's valid base64 and long enough
        if (strlen($data) < strlen($minLength)) {
            return false;
        }

        // Check if it looks like base64
        if (!preg_match('/^[A-Za-z0-9+\/]+=*$/', $data)) {
            return false;
        }

        // Check if it contains @ (common in emails) - if so, it's not encrypted
        if (strpos($data, '@') !== false) {
            return false;
        }

        return true;
    }

    /**
     * Create a searchable hash of the email for lookups
     * This allows searching for emails without exposing them
     * @param string $email The email to hash
     * @return string The hash
     */
    public function hashForSearch($email) {
        return hash('sha256', strtolower(trim($email)));
    }
}

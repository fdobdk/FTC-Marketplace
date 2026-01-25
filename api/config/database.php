<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $port;
    private $conn;

    public function __construct() {
        // Use environment variables if available, otherwise use defaults for local dev
        // Try getenv(), $_ENV, and $_SERVER for maximum compatibility with Docker
        $this->host = $this->getEnvVar('DB_HOST', 'localhost');
        $this->db_name = $this->getEnvVar('DB_NAME', 'ftc_marketplace');
        $this->username = $this->getEnvVar('DB_USER', 'root');
        $this->password = $this->getEnvVar('DB_PASSWORD', '');
        $this->port = $this->getEnvVar('DB_PORT', '3306');
    }

    private function getEnvVar($name, $default = null) {
        // Try multiple methods to get environment variable
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

    public function getConnection() {
        $this->conn = null;

        try {
            // Force TCP/IP connection by using 127.0.0.1 instead of localhost for local dev
            $host = ($this->host === 'localhost') ? '127.0.0.1' : $this->host;
            $dsn = "mysql:host={$host};port={$this->port};dbname={$this->db_name};charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // Include connection details in error for debugging (remove in production)
            throw new Exception("Database connection error: " . $e->getMessage() . " (Host: {$this->host}, Port: {$this->port}, DB: {$this->db_name})");
        }

        return $this->conn;
    }
}

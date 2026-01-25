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
        // Try both getenv() and $_ENV for compatibility
        $this->host = getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? 'localhost');
        $this->db_name = getenv('DB_NAME') ?: ($_ENV['DB_NAME'] ?? 'ftc_marketplace');
        $this->username = getenv('DB_USER') ?: ($_ENV['DB_USER'] ?? 'root');
        $this->password = getenv('DB_PASSWORD') ?: ($_ENV['DB_PASSWORD'] ?? '');
        $this->port = getenv('DB_PORT') ?: ($_ENV['DB_PORT'] ?? '3306');
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

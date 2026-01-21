<?php
class Auth {
    private $db;
    private $secret_key = 'ftc_marketplace_secret_key_change_in_production';

    public function __construct($db) {
        $this->db = $db;
    }

    public function generateToken($user_id) {
        $token = bin2hex(random_bytes(32));
        $expires_at = date('Y-m-d H:i:s', strtotime('+7 days'));

        $query = "INSERT INTO auth_tokens (user_id, token, expires_at) VALUES (:user_id, :token, :expires_at)";
        $stmt = $this->db->prepare($query);
        $stmt->execute([
            ':user_id' => $user_id,
            ':token' => $token,
            ':expires_at' => $expires_at
        ]);

        return $token;
    }

    public function validateToken($token) {
        $query = "SELECT user_id FROM auth_tokens
                  WHERE token = :token AND expires_at > NOW()";
        $stmt = $this->db->prepare($query);
        $stmt->execute([':token' => $token]);

        $result = $stmt->fetch();
        return $result ? $result['user_id'] : null;
    }

    public function getAuthenticatedUser() {
        $headers = getallheaders();
        $auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : '';

        if (preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
            $token = $matches[1];
            $user_id = $this->validateToken($token);

            if ($user_id) {
                return $this->getUserById($user_id);
            }
        }

        return null;
    }

    public function getUserById($id) {
        $query = "SELECT u.id, u.name, u.email, u.team_id, u.role,
                         u.contact_email, u.contact_phone, u.contact_discord,
                         u.team_role, u.team_status, u.bio, u.graduation_year,
                         u.specialties, u.is_site_admin,
                         t.team_number, t.name as team_name, t.city, t.state
                  FROM users u
                  LEFT JOIN teams t ON u.team_id = t.id
                  WHERE u.id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch();
    }

    public function isSiteAdmin($user) {
        return $user && isset($user['is_site_admin']) && $user['is_site_admin'];
    }

    public function hashPassword($password) {
        return password_hash($password, PASSWORD_BCRYPT);
    }

    public function verifyPassword($password, $hash) {
        return password_verify($password, $hash);
    }

    public function revokeToken($token) {
        $query = "DELETE FROM auth_tokens WHERE token = :token";
        $stmt = $this->db->prepare($query);
        $stmt->execute([':token' => $token]);
    }

    public function cleanExpiredTokens() {
        $query = "DELETE FROM auth_tokens WHERE expires_at < NOW()";
        $this->db->exec($query);
    }
}

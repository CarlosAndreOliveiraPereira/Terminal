<?php
/**
 * Terminal 404 - Database Configuration
 * 
 * IMPORTANT SECURITY NOTES:
 * 1. Never commit this file with real credentials to version control
 * 2. Use environment variables in production
 * 3. Ensure file permissions are restrictive (chmod 600)
 */

// Database Configuration
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'terminal404_db');
define('DB_USER', getenv('DB_USER') ?: 'terminal404_user');
define('DB_PASS', getenv('DB_PASS') ?: 'CHANGE_THIS_PASSWORD');
define('DB_CHARSET', 'utf8mb4');

// Security Settings
define('ADMIN_USERNAME', getenv('ADMIN_USERNAME') ?: 'admin');
define('ADMIN_PASSWORD_HASH', getenv('ADMIN_PASSWORD_HASH') ?: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'); // Default: 'password' - CHANGE THIS!

// JWT Secret (generate a strong random string)
define('JWT_SECRET', getenv('JWT_SECRET') ?: 'CHANGE_THIS_TO_A_RANDOM_SECRET_KEY');

// Rate Limiting
define('RATE_LIMIT_REQUESTS', 10); // Max requests per time window
define('RATE_LIMIT_WINDOW', 3600); // Time window in seconds (1 hour)

// CORS Settings
define('ALLOWED_ORIGINS', ['http://localhost:5173', 'http://localhost:3000', 'https://terminal404.com']);

// Error Reporting (disable in production)
define('DEBUG_MODE', getenv('DEBUG_MODE') === 'true');

if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Timezone
date_default_timezone_set('America/Sao_Paulo');

/**
 * Get database connection
 */
function getDbConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        if (DEBUG_MODE) {
            die("Connection failed: " . $e->getMessage());
        }
        die("Database connection error");
    }
}

/**
 * Set CORS headers
 */
function setCorsHeaders() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, ALLOWED_ORIGINS)) {
        header("Access-Control-Allow-Origin: $origin");
    }
    
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Max-Age: 86400");
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

/**
 * Send JSON response
 */
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Sanitize input
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validate email
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Check rate limit
 */
function checkRateLimit($identifier) {
    $db = getDbConnection();
    
    // Clean old entries
    $stmt = $db->prepare("DELETE FROM rate_limit WHERE created_at < DATE_SUB(NOW(), INTERVAL ? SECOND)");
    $stmt->execute([RATE_LIMIT_WINDOW]);
    
    // Check current count
    $stmt = $db->prepare("SELECT COUNT(*) as count FROM rate_limit WHERE identifier = ? AND created_at >= DATE_SUB(NOW(), INTERVAL ? SECOND)");
    $stmt->execute([$identifier, RATE_LIMIT_WINDOW]);
    $result = $stmt->fetch();
    
    if ($result['count'] >= RATE_LIMIT_REQUESTS) {
        return false;
    }
    
    // Add new entry
    $stmt = $db->prepare("INSERT INTO rate_limit (identifier, created_at) VALUES (?, NOW())");
    $stmt->execute([$identifier]);
    
    return true;
}

<?php
/**
 * Terminal 404 - Database Configuration (EXAMPLE)
 * 
 * INSTRUÇÕES:
 * 1. Copie este arquivo como config.php
 * 2. Preencha com suas credenciais reais
 * 3. Use o script generate-credentials.php para gerar valores seguros
 * 
 * IMPORTANTE: NUNCA faça commit do config.php real!
 */

// ==========================================
// BANCO DE DADOS
// ==========================================
define('DB_HOST', 'localhost');
define('DB_NAME', 'terminal404_db');
define('DB_USER', 'terminal404_user');
define('DB_PASS', 'CHANGE_THIS_PASSWORD'); // ⚠️ MUDE ISSO!
define('DB_CHARSET', 'utf8mb4');

// ==========================================
// ADMIN - CREDENCIAIS
// ==========================================
define('ADMIN_USERNAME', 'admin');

// ⚠️ GERE UM HASH BCRYPT SEGURO!
// Use: php -r "echo password_hash('sua_senha', PASSWORD_BCRYPT);"
// Ou execute: php generate-credentials.php
define('ADMIN_PASSWORD_HASH', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'); // Senha padrão: "password" - MUDE!

// ==========================================
// JWT - AUTENTICAÇÃO
// ==========================================
// ⚠️ GERE UMA CHAVE ALEATÓRIA FORTE!
// Use: openssl rand -hex 32
// Ou execute: php generate-credentials.php
define('JWT_SECRET', 'CHANGE_THIS_TO_A_RANDOM_SECRET_KEY_MIN_64_CHARS_LONG_USE_OPENSSL'); // ⚠️ MUDE ISSO!

// ==========================================
// RATE LIMITING
// ==========================================
define('RATE_LIMIT_REQUESTS', 10); // Máximo de requisições
define('RATE_LIMIT_WINDOW', 3600); // Janela de tempo (segundos) - 1 hora

// ==========================================
// CORS - ORIGENS PERMITIDAS
// ==========================================
// Adicione os domínios que podem acessar sua API
define('ALLOWED_ORIGINS', [
    'http://localhost:5173',       // Vite dev server
    'http://localhost:3000',       // Alternative dev port
    'https://terminal404.com',     // Seu domínio de produção
    'https://www.terminal404.com'  // Seu domínio com www
]);

// ==========================================
// MODO DEBUG
// ==========================================
// ⚠️ SEMPRE false em produção!
define('DEBUG_MODE', true); // Mude para false em produção

if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// ==========================================
// TIMEZONE
// ==========================================
date_default_timezone_set('America/Sao_Paulo');

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

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

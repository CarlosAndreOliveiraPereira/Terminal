<?php
/**
 * Terminal 404 - Admin Login Handler
 * Handles admin authentication
 */

require_once __DIR__ . '/config.php';

setCorsHeaders();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

try {
    // Get JSON input
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendJsonResponse(['success' => false, 'message' => 'Invalid JSON'], 400);
    }
    
    // Get client IP for rate limiting
    $clientIp = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'];
    
    // Check rate limit (stricter for login attempts)
    if (!checkRateLimit('login_' . $clientIp)) {
        sendJsonResponse([
            'success' => false, 
            'message' => 'Muitas tentativas de login. Tente novamente mais tarde.'
        ], 429);
    }
    
    // Validate required fields
    if (empty($input['username']) || empty($input['password'])) {
        sendJsonResponse([
            'success' => false, 
            'message' => 'Usuário e senha são obrigatórios'
        ], 400);
    }
    
    $username = sanitizeInput($input['username']);
    $password = $input['password']; // Don't sanitize password
    
    // Verify credentials
    if ($username !== ADMIN_USERNAME || !password_verify($password, ADMIN_PASSWORD_HASH)) {
        // Log failed attempt
        error_log("Failed login attempt for user: $username from IP: $clientIp");
        
        sendJsonResponse([
            'success' => false, 
            'message' => 'Credenciais inválidas'
        ], 401);
    }
    
    // Generate JWT token (simplified version - in production use a proper JWT library)
    $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64_encode(json_encode([
        'username' => $username,
        'iat' => time(),
        'exp' => time() + 3600 * 8 // 8 hours
    ]));
    
    $signature = hash_hmac('sha256', "$header.$payload", JWT_SECRET, true);
    $signature = base64_encode($signature);
    
    $token = "$header.$payload.$signature";
    
    // Store session in database (optional)
    try {
        $db = getDbConnection();
        $stmt = $db->prepare("
            INSERT INTO admin_sessions (username, token, ip_address, user_agent, expires_at) 
            VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 8 HOUR))
        ");
        
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
        $stmt->execute([$username, $token, $clientIp, $userAgent]);
    } catch (PDOException $e) {
        // Session storage is optional, continue even if it fails
        error_log("Failed to store admin session: " . $e->getMessage());
    }
    
    sendJsonResponse([
        'success' => true,
        'message' => 'Login successful',
        'token' => $token,
        'expiresIn' => 3600 * 8
    ], 200);
    
} catch (Exception $e) {
    if (DEBUG_MODE) {
        sendJsonResponse([
            'success' => false, 
            'message' => 'Error: ' . $e->getMessage()
        ], 500);
    }
    
    sendJsonResponse([
        'success' => false, 
        'message' => 'Erro interno do servidor'
    ], 500);
}

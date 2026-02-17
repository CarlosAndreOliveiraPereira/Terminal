<?php
/**
 * Terminal 404 - Admin Quote Management
 * Retrieves quote submissions for admin panel
 */

require_once __DIR__ . '/config.php';

setCorsHeaders();

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

/**
 * Verify JWT token
 */
function verifyToken($token) {
    if (empty($token)) {
        return false;
    }
    
    // Remove 'Bearer ' prefix if present
    $token = str_replace('Bearer ', '', $token);
    
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return false;
    }
    
    list($header, $payload, $signature) = $parts;
    
    // Verify signature
    $validSignature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    
    if ($signature !== $validSignature) {
        return false;
    }
    
    // Verify expiration
    $payloadData = json_decode(base64_decode($payload), true);
    if ($payloadData['exp'] < time()) {
        return false;
    }
    
    return $payloadData;
}

try {
    // Get authorization header
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    
    if (empty($authHeader)) {
        // Try alternative header
        $authHeader = apache_request_headers()['Authorization'] ?? '';
    }
    
    // Verify token
    $tokenData = verifyToken($authHeader);
    
    if (!$tokenData) {
        sendJsonResponse([
            'success' => false, 
            'message' => 'Unauthorized'
        ], 401);
    }
    
    // Get database connection
    $db = getDbConnection();
    
    // Get query parameters
    $search = $_GET['search'] ?? '';
    $dateFilter = $_GET['date'] ?? '';
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
    
    // Build query
    $sql = "SELECT id, name, email, phone, project_type, description, budget, deadline, created_at 
            FROM quote_submissions 
            WHERE 1=1";
    
    $params = [];
    
    if (!empty($search)) {
        $sql .= " AND (name LIKE ? OR email LIKE ?)";
        $searchTerm = "%$search%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }
    
    if (!empty($dateFilter)) {
        $sql .= " AND DATE(created_at) = ?";
        $params[] = $dateFilter;
    }
    
    $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;
    
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    
    $submissions = $stmt->fetchAll();
    
    // Get total count
    $countSql = "SELECT COUNT(*) as total FROM quote_submissions WHERE 1=1";
    $countParams = [];
    
    if (!empty($search)) {
        $countSql .= " AND (name LIKE ? OR email LIKE ?)";
        $countParams[] = $searchTerm;
        $countParams[] = $searchTerm;
    }
    
    if (!empty($dateFilter)) {
        $countSql .= " AND DATE(created_at) = ?";
        $countParams[] = $dateFilter;
    }
    
    $countStmt = $db->prepare($countSql);
    $countStmt->execute($countParams);
    $totalCount = $countStmt->fetch()['total'];
    
    sendJsonResponse([
        'success' => true,
        'data' => $submissions,
        'meta' => [
            'total' => $totalCount,
            'limit' => $limit,
            'offset' => $offset
        ]
    ], 200);
    
} catch (PDOException $e) {
    if (DEBUG_MODE) {
        sendJsonResponse([
            'success' => false, 
            'message' => 'Database error: ' . $e->getMessage()
        ], 500);
    }
    
    sendJsonResponse([
        'success' => false, 
        'message' => 'Erro ao buscar dados'
    ], 500);
    
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

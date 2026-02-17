<?php
/**
 * Terminal 404 - Quote Form Handler
 * Handles quote submission with security measures
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
    
    // Check rate limit
    if (!checkRateLimit($clientIp)) {
        sendJsonResponse([
            'success' => false, 
            'message' => 'Muitas requisições. Tente novamente mais tarde.'
        ], 429);
    }
    
    // Validate required fields
    $requiredFields = ['name', 'email', 'phone', 'projectType', 'description', 'budget', 'deadline'];
    foreach ($requiredFields as $field) {
        if (empty($input[$field])) {
            sendJsonResponse([
                'success' => false, 
                'message' => "Campo obrigatório ausente: $field"
            ], 400);
        }
    }
    
    // Sanitize inputs
    $name = sanitizeInput($input['name']);
    $email = sanitizeInput($input['email']);
    $phone = sanitizeInput($input['phone']);
    $projectType = sanitizeInput($input['projectType']);
    $description = sanitizeInput($input['description']);
    $budget = sanitizeInput($input['budget']);
    $deadline = sanitizeInput($input['deadline']);
    
    // Validate email format
    if (!validateEmail($email)) {
        sendJsonResponse([
            'success' => false, 
            'message' => 'E-mail inválido'
        ], 400);
    }
    
    // Validate name length
    if (strlen($name) < 3 || strlen($name) > 255) {
        sendJsonResponse([
            'success' => false, 
            'message' => 'Nome deve ter entre 3 e 255 caracteres'
        ], 400);
    }
    
    // Validate description length
    if (strlen($description) < 10 || strlen($description) > 2000) {
        sendJsonResponse([
            'success' => false, 
            'message' => 'Descrição deve ter entre 10 e 2000 caracteres'
        ], 400);
    }
    
    // Validate project type
    $validProjectTypes = ['landing-page', 'site-institucional', 'e-commerce', 'sistema-web', 'outro'];
    if (!in_array($projectType, $validProjectTypes)) {
        sendJsonResponse([
            'success' => false, 
            'message' => 'Tipo de projeto inválido'
        ], 400);
    }
    
    // Get database connection
    $db = getDbConnection();
    
    // Prepare and execute insert
    $stmt = $db->prepare("
        INSERT INTO quote_submissions 
        (name, email, phone, project_type, description, budget, deadline, ip_address, user_agent) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
    
    $stmt->execute([
        $name,
        $email,
        $phone,
        $projectType,
        $description,
        $budget,
        $deadline,
        $clientIp,
        $userAgent
    ]);
    
    $submissionId = $db->lastInsertId();
    
    // Optional: Send email notification to admin
    // This requires configuring PHP mail or using a service like SendGrid
    /*
    $to = 'terminallocal404@gmail.com';
    $subject = 'Nova Solicitação de Orçamento - Terminal 404';
    $message = "Nova solicitação recebida:\n\n";
    $message .= "Nome: $name\n";
    $message .= "E-mail: $email\n";
    $message .= "Telefone: $phone\n";
    $message .= "Tipo: $projectType\n";
    $message .= "Orçamento: $budget\n";
    $message .= "Prazo: $deadline\n";
    $message .= "Descrição: $description\n";
    
    mail($to, $subject, $message);
    */
    
    // Return success response
    sendJsonResponse([
        'success' => true,
        'message' => 'Orçamento enviado com sucesso',
        'data' => [
            'id' => $submissionId,
            'name' => $name,
            'email' => $email
        ]
    ], 201);
    
} catch (PDOException $e) {
    if (DEBUG_MODE) {
        sendJsonResponse([
            'success' => false, 
            'message' => 'Database error: ' . $e->getMessage()
        ], 500);
    }
    
    sendJsonResponse([
        'success' => false, 
        'message' => 'Erro ao processar solicitação'
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

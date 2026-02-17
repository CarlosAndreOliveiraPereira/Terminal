#!/usr/bin/env php
<?php
/**
 * Terminal 404 - Credential Generator
 * Helper script to generate secure credentials
 */

echo "\n";
echo "╔════════════════════════════════════════════════════╗\n";
echo "║   Terminal 404 - Credential Generator             ║\n";
echo "║   Gerador de Credenciais Seguras                   ║\n";
echo "╚════════════════════════════════════════════════════╝\n";
echo "\n";

// Function to generate random string
function generateRandomString($length = 64) {
    return bin2hex(random_bytes($length / 2));
}

// 1. Generate Admin Password Hash
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "1. ADMIN PASSWORD HASH\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

echo "Digite a senha do admin (ou pressione Enter para gerar uma aleatória): ";
$password = trim(fgets(STDIN));

if (empty($password)) {
    $password = generateRandomString(16);
    echo "✅ Senha gerada aleatoriamente: $password\n";
}

$passwordHash = password_hash($password, PASSWORD_BCRYPT);

echo "\n📋 Hash bcrypt da senha:\n";
echo "───────────────────────────────────────────────────\n";
echo "$passwordHash\n";
echo "───────────────────────────────────────────────────\n";

echo "\n⚙️  Adicione ao config.php:\n";
echo "define('ADMIN_PASSWORD_HASH', '$passwordHash');\n\n";

// 2. Generate JWT Secret
echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "2. JWT SECRET KEY\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$jwtSecret = generateRandomString(64);

echo "📋 Chave JWT gerada:\n";
echo "───────────────────────────────────────────────────\n";
echo "$jwtSecret\n";
echo "───────────────────────────────────────────────────\n";

echo "\n⚙️  Adicione ao config.php:\n";
echo "define('JWT_SECRET', '$jwtSecret');\n\n";

// 3. Generate Database Password (suggestion)
echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "3. DATABASE PASSWORD (sugestão)\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$dbPassword = generateRandomString(32);

echo "📋 Senha de banco de dados sugerida:\n";
echo "───────────────────────────────────────────────────\n";
echo "$dbPassword\n";
echo "───────────────────────────────────────────────────\n";

echo "\n⚙️  Adicione ao config.php:\n";
echo "define('DB_PASS', '$dbPassword');\n\n";

// 4. Summary
echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "RESUMO - Copie para o config.php\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

echo "// Admin Configuration\n";
echo "define('ADMIN_USERNAME', 'admin');\n";
echo "define('ADMIN_PASSWORD_HASH', '$passwordHash');\n\n";

echo "// JWT Secret\n";
echo "define('JWT_SECRET', '$jwtSecret');\n\n";

echo "// Database Password\n";
echo "define('DB_PASS', '$dbPassword');\n\n";

// 5. Save to file option
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "Deseja salvar essas credenciais em um arquivo? (s/n): ";
$save = trim(fgets(STDIN));

if (strtolower($save) === 's' || strtolower($save) === 'sim') {
    $filename = 'credentials_' . date('Y-m-d_H-i-s') . '.txt';
    
    $content = "Terminal 404 - Credenciais Geradas em " . date('Y-m-d H:i:s') . "\n";
    $content .= "═════════════════════════════════════════════════════════\n\n";
    $content .= "ADMIN LOGIN\n";
    $content .= "Usuário: admin\n";
    $content .= "Senha: $password\n";
    $content .= "Hash: $passwordHash\n\n";
    $content .= "JWT SECRET\n";
    $content .= "$jwtSecret\n\n";
    $content .= "DATABASE PASSWORD (sugestão)\n";
    $content .= "$dbPassword\n\n";
    $content .= "═════════════════════════════════════════════════════════\n";
    $content .= "⚠️  IMPORTANTE: Guarde este arquivo em local seguro!\n";
    $content .= "⚠️  NÃO COMPARTILHE este arquivo publicamente!\n";
    $content .= "⚠️  DELETE este arquivo após configurar o sistema!\n";
    
    file_put_contents($filename, $content);
    
    echo "\n✅ Credenciais salvas em: $filename\n";
    echo "⚠️  IMPORTANTE: Delete este arquivo após usar!\n";
}

echo "\n";
echo "╔════════════════════════════════════════════════════╗\n";
echo "║   ✅ Credenciais geradas com sucesso!              ║\n";
echo "╚════════════════════════════════════════════════════╝\n";
echo "\n";
echo "📝 Próximos passos:\n";
echo "   1. Copie as credenciais para backend/config.php\n";
echo "   2. Configure o banco de dados MySQL\n";
echo "   3. Importe o schema (database-schema.sql)\n";
echo "   4. Teste o sistema\n";
echo "   5. Delete os arquivos de credenciais temporários\n";
echo "\n";

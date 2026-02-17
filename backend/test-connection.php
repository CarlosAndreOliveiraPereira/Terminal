#!/usr/bin/env php
<?php
/**
 * Terminal 404 - Connection Test Script
 * Testa se todas as configurações estão corretas
 */

echo "\n";
echo "╔════════════════════════════════════════════════════╗\n";
echo "║   Terminal 404 - Connection Test                  ║\n";
echo "║   Teste de Configuração e Conexões                 ║\n";
echo "╚════════════════════════════════════════════════════╝\n";
echo "\n";

$errors = [];
$warnings = [];
$success = [];

// Check if config.php exists
echo "📋 Verificando arquivo de configuração...\n";
if (!file_exists(__DIR__ . '/config.php')) {
    $errors[] = "❌ config.php não encontrado! Copie config.example.php para config.php";
} else {
    $success[] = "✅ config.php encontrado";
    require_once __DIR__ . '/config.php';
}

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "TESTE 1: Extensões PHP\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

$requiredExtensions = ['pdo', 'pdo_mysql', 'json', 'mbstring'];

foreach ($requiredExtensions as $ext) {
    if (extension_loaded($ext)) {
        echo "✅ Extensão '$ext' instalada\n";
        $success[] = "Extensão $ext OK";
    } else {
        echo "❌ Extensão '$ext' NÃO instalada\n";
        $errors[] = "Extensão $ext necessária";
    }
}

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "TESTE 2: Configurações de Segurança\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

// Check admin password
if (defined('ADMIN_PASSWORD_HASH')) {
    if (ADMIN_PASSWORD_HASH === '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi') {
        echo "⚠️  AVISO: Senha admin padrão detectada!\n";
        $warnings[] = "Mude a senha do admin";
    } else {
        echo "✅ Hash de senha admin customizado\n";
        $success[] = "Senha admin configurada";
    }
} else {
    echo "❌ ADMIN_PASSWORD_HASH não definido\n";
    $errors[] = "Configure ADMIN_PASSWORD_HASH";
}

// Check JWT secret
if (defined('JWT_SECRET')) {
    if (strlen(JWT_SECRET) < 32) {
        echo "⚠️  AVISO: JWT_SECRET muito curto (mínimo 32 caracteres)\n";
        $warnings[] = "Aumente o tamanho do JWT_SECRET";
    } elseif (JWT_SECRET === 'CHANGE_THIS_TO_A_RANDOM_SECRET_KEY') {
        echo "⚠️  AVISO: JWT_SECRET padrão detectado!\n";
        $warnings[] = "Mude o JWT_SECRET";
    } else {
        echo "✅ JWT_SECRET configurado adequadamente\n";
        $success[] = "JWT Secret OK";
    }
} else {
    echo "❌ JWT_SECRET não definido\n";
    $errors[] = "Configure JWT_SECRET";
}

// Check database password
if (defined('DB_PASS')) {
    if (DB_PASS === 'CHANGE_THIS_PASSWORD') {
        echo "⚠️  AVISO: Senha de banco padrão detectada!\n";
        $warnings[] = "Mude a senha do banco de dados";
    } else {
        echo "✅ Senha de banco de dados customizada\n";
        $success[] = "DB Password configurada";
    }
}

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "TESTE 3: Conexão com Banco de Dados\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

if (function_exists('getDbConnection')) {
    try {
        $db = getDbConnection();
        echo "✅ Conexão com banco de dados bem-sucedida\n";
        $success[] = "Conexão DB OK";
        
        // Check if tables exist
        $tables = ['quote_submissions', 'rate_limit', 'admin_sessions', 'access_logs'];
        foreach ($tables as $table) {
            $stmt = $db->query("SHOW TABLES LIKE '$table'");
            if ($stmt->rowCount() > 0) {
                echo "✅ Tabela '$table' existe\n";
                $success[] = "Tabela $table OK";
            } else {
                echo "❌ Tabela '$table' NÃO existe\n";
                $errors[] = "Tabela $table não encontrada";
            }
        }
        
    } catch (Exception $e) {
        echo "❌ Erro ao conectar ao banco de dados\n";
        echo "   Detalhes: " . $e->getMessage() . "\n";
        $errors[] = "Falha na conexão DB: " . $e->getMessage();
    }
} else {
    echo "❌ Função getDbConnection não encontrada\n";
    $errors[] = "config.php mal configurado";
}

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "TESTE 4: Permissões de Arquivos\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

$configPerms = substr(sprintf('%o', fileperms(__DIR__ . '/config.php')), -4);
if ($configPerms === '0600' || $configPerms === '0400') {
    echo "✅ Permissões de config.php corretas ($configPerms)\n";
    $success[] = "Permissões config.php OK";
} else {
    echo "⚠️  AVISO: Permissões de config.php são $configPerms (recomendado: 0600)\n";
    echo "   Execute: chmod 600 backend/config.php\n";
    $warnings[] = "Ajuste permissões do config.php";
}

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "TESTE 5: Modo de Operação\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

if (defined('DEBUG_MODE')) {
    if (DEBUG_MODE) {
        echo "⚠️  Modo DEBUG ativado (OK para desenvolvimento)\n";
        echo "   ⚠️  Desative antes de fazer deploy em produção!\n";
        $warnings[] = "DEBUG_MODE ativado";
    } else {
        echo "✅ Modo DEBUG desativado (produção)\n";
        $success[] = "DEBUG_MODE desativado";
    }
}

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "RESUMO\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

echo "✅ Sucessos: " . count($success) . "\n";
echo "⚠️  Avisos: " . count($warnings) . "\n";
echo "❌ Erros: " . count($errors) . "\n\n";

if (count($errors) > 0) {
    echo "❌ ERROS CRÍTICOS:\n";
    foreach ($errors as $error) {
        echo "   • $error\n";
    }
    echo "\n";
}

if (count($warnings) > 0) {
    echo "⚠️  AVISOS:\n";
    foreach ($warnings as $warning) {
        echo "   • $warning\n";
    }
    echo "\n";
}

if (count($errors) === 0 && count($warnings) === 0) {
    echo "╔════════════════════════════════════════════════════╗\n";
    echo "║   🎉 TUDO CONFIGURADO CORRETAMENTE! 🎉             ║\n";
    echo "╚════════════════════════════════════════════════════╝\n";
    echo "\nSeu backend está pronto para uso!\n";
} elseif (count($errors) === 0) {
    echo "╔════════════════════════════════════════════════════╗\n";
    echo "║   ✅ Configuração OK (com avisos)                  ║\n";
    echo "╚════════════════════════════════════════════════════╝\n";
    echo "\nSeu backend funcionará, mas revise os avisos.\n";
} else {
    echo "╔════════════════════════════════════════════════════╗\n";
    echo "║   ❌ CONFIGURAÇÃO INCOMPLETA                       ║\n";
    echo "╚════════════════════════════════════════════════════╝\n";
    echo "\nCorreja os erros antes de continuar.\n";
}

echo "\n📚 Para mais ajuda:\n";
echo "   • Leia: QUICK_START.md\n";
echo "   • Leia: backend/PHP_SETUP.md\n";
echo "   • Execute: php backend/generate-credentials.php\n";
echo "\n";

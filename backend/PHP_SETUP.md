# Terminal 404 - PHP Backend Setup

Este documento contém as instruções para configurar o backend PHP do sistema de orçamentos.

## 📋 Requisitos

- PHP 7.4 ou superior
- MySQL 5.7 ou superior / MariaDB 10.3+
- Extensões PHP necessárias:
  - `pdo`
  - `pdo_mysql`
  - `json`
  - `mbstring`

## 🚀 Instalação

### 1. Configurar o Banco de Dados

```bash
# Conecte ao MySQL
mysql -u root -p

# Execute o schema SQL
mysql -u root -p < backend/database-schema.sql

# Ou importe manualmente via phpMyAdmin
```

### 2. Configurar Credenciais

Edite o arquivo `/backend/config.php` e configure:

```php
// Banco de Dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'terminal404_db');
define('DB_USER', 'seu_usuario');
define('DB_PASS', 'sua_senha_segura');

// Admin (gere um hash seguro)
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD_HASH', 'HASH_GERADO');

// JWT Secret (gere uma chave aleatória forte)
define('JWT_SECRET', 'sua_chave_secreta_aleatoria_longa');
```

### 3. Gerar Hash de Senha para Admin

Execute este comando PHP para gerar um hash bcrypt:

```php
<?php
echo password_hash('sua_senha_aqui', PASSWORD_BCRYPT);
?>
```

Ou use este comando no terminal:

```bash
php -r "echo password_hash('sua_senha_aqui', PASSWORD_BCRYPT);"
```

### 4. Configurar Permissões

```bash
# Ajuste as permissões dos arquivos PHP
chmod 600 backend/config.php
chmod 644 backend/*.php
```

### 5. Configurar CORS

No arquivo `config.php`, ajuste os domínios permitidos:

```php
define('ALLOWED_ORIGINS', [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://seudominio.com'
]);
```

## 🔐 Segurança

### Medidas Implementadas

1. **Prepared Statements**: Proteção contra SQL Injection
2. **Password Hashing**: Senhas hasheadas com bcrypt
3. **Rate Limiting**: Limite de requisições por IP
4. **Input Sanitization**: Validação e sanitização de todos os inputs
5. **CORS Configurável**: Apenas origens permitidas
6. **JWT Authentication**: Autenticação segura para admin
7. **HTTPS Recomendado**: Configure SSL/TLS em produção

### Configuração de Produção

1. **Desabilite o modo debug**:
   ```php
   define('DEBUG_MODE', false);
   ```

2. **Use HTTPS obrigatoriamente**

3. **Configure rate limiting adequado**

4. **Use senhas fortes**

5. **Mantenha as credenciais em variáveis de ambiente**:
   ```bash
   export DB_PASS="senha_forte_aqui"
   export JWT_SECRET="chave_secreta_longa"
   export ADMIN_PASSWORD_HASH="hash_bcrypt"
   ```

## 📁 Estrutura de Arquivos

```
backend/
├── config.php              # Configurações e funções auxiliares
├── database-schema.sql     # Schema do banco de dados
├── quote-form.php          # Handler do formulário de orçamento
├── admin-login.php         # Autenticação de admin
├── admin-quotes.php        # API para listar orçamentos
├── app.py                  # Backend Python (mantido separado)
└── PHP_SETUP.md           # Esta documentação
```

## 🌐 Endpoints da API

### POST /backend/quote-form.php
Envio de solicitação de orçamento

**Request:**
```json
{
  "name": "Nome Completo",
  "email": "email@exemplo.com",
  "phone": "(32) 99999-9999",
  "projectType": "landing-page",
  "description": "Descrição do projeto...",
  "budget": "2k-5k",
  "deadline": "1-mes"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Orçamento enviado com sucesso",
  "data": {
    "id": 1,
    "name": "Nome Completo",
    "email": "email@exemplo.com"
  }
}
```

### POST /backend/admin-login.php
Login do administrador

**Request:**
```json
{
  "username": "admin",
  "password": "senha"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhb...",
  "expiresIn": 28800
}
```

### GET /backend/admin-quotes.php
Listar orçamentos (requer autenticação)

**Headers:**
```
Authorization: Bearer TOKEN_JWT
```

**Query Parameters:**
- `search`: Busca por nome ou email
- `date`: Filtro por data (YYYY-MM-DD)
- `limit`: Limite de resultados (padrão: 100)
- `offset`: Offset para paginação (padrão: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Nome",
      "email": "email@exemplo.com",
      "phone": "(32) 99999-9999",
      "project_type": "landing-page",
      "description": "Descrição...",
      "budget": "2k-5k",
      "deadline": "1-mes",
      "created_at": "2026-02-17 10:30:00"
    }
  ],
  "meta": {
    "total": 1,
    "limit": 100,
    "offset": 0
  }
}
```

## 🔧 Troubleshooting

### Erro de conexão com o banco
- Verifique as credenciais em `config.php`
- Certifique-se de que o MySQL está rodando
- Verifique se o usuário tem permissões adequadas

### CORS errors
- Adicione o domínio do frontend em `ALLOWED_ORIGINS`
- Verifique se o servidor web está configurado corretamente

### Rate limiting muito agressivo
- Ajuste `RATE_LIMIT_REQUESTS` e `RATE_LIMIT_WINDOW` em `config.php`

### Senha admin não funciona
- Verifique se o hash foi gerado corretamente
- Teste com uma senha simples primeiro (APENAS EM DESENVOLVIMENTO)

## 📧 Notificações por E-mail (Opcional)

Para habilitar notificações por e-mail quando um orçamento é enviado, descomente e configure a seção de e-mail em `quote-form.php`.

Recomendamos usar um serviço como SendGrid, Mailgun ou AWS SES para envios em produção.

## 🐳 Deploy com Apache/Nginx

### Apache (.htaccess)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [QSA,L]

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
```

### Nginx
```nginx
location /backend {
    try_files $uri $uri/ /backend/index.php?$query_string;
    
    # Security headers
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
}
```

## 📝 Licença

Propriedade de Terminal 404. Todos os direitos reservados.

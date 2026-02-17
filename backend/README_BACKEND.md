# 🔧 Terminal 404 - Backend PHP

Backend completo em PHP para gerenciamento de orçamentos e painel administrativo.

## 📁 Estrutura

```
backend/
├── config.php              # ⚙️  Configurações (crie a partir do example)
├── config.example.php      # 📋 Template de configuração
├── quote-form.php          # 📝 Handler do formulário de orçamento
├── admin-login.php         # 🔐 Autenticação de admin
├── admin-quotes.php        # 📊 API de listagem de orçamentos
├── database-schema.sql     # 🗄️  Schema do banco de dados
├── generate-credentials.php # 🔑 Gerador de credenciais seguras
├── test-connection.php     # ✅ Script de teste de conexão
├── dev-server.sh          # 🚀 Servidor de desenvolvimento
├── .htaccess              # 🔒 Configurações Apache
├── .gitignore             # 🚫 Proteção de arquivos sensíveis
└── PHP_SETUP.md           # 📖 Documentação detalhada
```

## 🚀 Quick Start

### 1. Copie o arquivo de configuração
```bash
cp backend/config.example.php backend/config.php
```

### 2. Gere credenciais seguras
```bash
cd backend
php generate-credentials.php
```

### 3. Edite config.php
Cole as credenciais geradas no passo anterior.

### 4. Configure o banco de dados
```bash
mysql -u root -p < backend/database-schema.sql
```

### 5. Teste a configuração
```bash
php backend/test-connection.php
```

### 6. Inicie o servidor
```bash
cd backend
./dev-server.sh
# Ou: php -S localhost:8000 -t .
```

## 🔐 Segurança

### ✅ Implementado
- Prepared Statements (SQL Injection)
- Password Hashing (bcrypt)
- Rate Limiting
- Input Sanitization (XSS)
- CORS Protection
- JWT Authentication
- HTTPS Ready

### ⚠️ Importante
1. **NUNCA** commite `config.php` com credenciais reais
2. Mude as senhas padrão IMEDIATAMENTE
3. Use HTTPS em produção
4. Desative `DEBUG_MODE` em produção
5. Configure backups regulares

## 📡 Endpoints

### POST /backend/quote-form.php
Recebe solicitações de orçamento

### POST /backend/admin-login.php
Autenticação de administrador

### GET /backend/admin-quotes.php
Lista orçamentos (requer autenticação)

## 🛠️ Scripts Úteis

### Gerar Credenciais
```bash
php backend/generate-credentials.php
```

### Testar Conexão
```bash
php backend/test-connection.php
```

### Resetar Senha Admin
```bash
php -r "echo password_hash('nova_senha', PASSWORD_BCRYPT);"
```

### Limpar Rate Limit (dev)
```sql
TRUNCATE TABLE rate_limit;
```

## 📊 Banco de Dados

### Tabelas Criadas
- `quote_submissions` - Orçamentos enviados
- `rate_limit` - Controle de taxa
- `admin_sessions` - Sessões de admin
- `access_logs` - Logs de acesso público

### Backup
```bash
mysqldump -u terminal404_user -p terminal404_db > backup.sql
```

### Restore
```bash
mysql -u terminal404_user -p terminal404_db < backup.sql
```

## 🐛 Troubleshooting

### "Connection failed"
- Verifique credenciais em `config.php`
- MySQL rodando?
- Usuário tem permissões?

### "CORS Error"
- Adicione domínio em `ALLOWED_ORIGINS`
- Reinicie o servidor PHP

### "Table doesn't exist"
- Importe o schema: `mysql ... < database-schema.sql`

### "Unauthorized" no admin
- Verifique `ADMIN_PASSWORD_HASH`
- Re-gere com `generate-credentials.php`

## 📚 Documentação Completa

- `/QUICK_START.md` - Guia rápido
- `/IMPLEMENTATION_COMPLETE.md` - Documentação completa
- `/backend/PHP_SETUP.md` - Setup detalhado

## 🚀 Deploy

### Desenvolvimento
```bash
php -S localhost:8000 -t backend/
```

### Produção (Apache)
1. Configure virtual host
2. Aponte DocumentRoot para `/backend`
3. Configure SSL/TLS
4. Ajuste `.htaccess`

### Produção (Nginx)
1. Configure server block
2. Configure PHP-FPM
3. Configure SSL/TLS
4. Ajuste permissões

## 📞 Suporte

- E-mail: terminallocal404@gmail.com
- WhatsApp: (32) 99154-7944

---

**Terminal 404** - Backend PHP  
Desenvolvido com ❤️ e ☕ por Xuehe

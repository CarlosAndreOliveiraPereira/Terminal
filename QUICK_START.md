# 🚀 Terminal 404 - Quick Start Guide

Guia rápido para colocar o sistema completo no ar!

## ⚡ Setup em 5 Minutos

### 1️⃣ Clone e Instale (Frontend)

```bash
# Já está pronto! Se precisar reinstalar:
npm install
```

### 2️⃣ Configure o Banco de Dados

```bash
# Acesse o MySQL
mysql -u root -p

# Crie o banco
CREATE DATABASE terminal404_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Crie um usuário
CREATE USER 'terminal404_user'@'localhost' IDENTIFIED BY 'sua_senha_forte';
GRANT ALL PRIVILEGES ON terminal404_db.* TO 'terminal404_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Importe o schema
mysql -u terminal404_user -p terminal404_db < backend/database-schema.sql
```

### 3️⃣ Gere Credenciais Seguras

```bash
cd backend
php generate-credentials.php

# Siga as instruções e copie as credenciais geradas
```

### 4️⃣ Configure o Backend PHP

Edite `/backend/config.php` com as credenciais geradas:

```php
// Banco de Dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'terminal404_db');
define('DB_USER', 'terminal404_user');
define('DB_PASS', 'COLE_A_SENHA_AQUI');

// Admin (use as credenciais geradas)
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD_HASH', 'COLE_O_HASH_GERADO_AQUI');

// JWT Secret (use a chave gerada)
define('JWT_SECRET', 'COLE_A_CHAVE_JWT_AQUI');

// Em desenvolvimento, pode deixar true
define('DEBUG_MODE', true);

// Adicione seu domínio local
define('ALLOWED_ORIGINS', [
    'http://localhost:5173',
    'http://localhost:3000'
]);
```

### 5️⃣ Inicie os Servidores

```bash
# Terminal 1: Frontend React
npm run dev

# Terminal 2: Backend Python (mantido)
cd backend
python app.py

# Terminal 3: Backend PHP (novo)
cd backend
chmod +x dev-server.sh
./dev-server.sh
```

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:5173
- **Backend Python**: http://localhost:5001
- **Backend PHP**: http://localhost:8000

## 🎯 Testando o Sistema

### 1. Formulário de Orçamento
1. Acesse: http://localhost:5173/contact
2. Preencha o formulário
3. Clique em "Enviar Agora"
4. Verifique se o orçamento foi salvo no banco:
   ```sql
   SELECT * FROM quote_submissions ORDER BY created_at DESC LIMIT 1;
   ```

### 2. Painel Administrativo
1. Acesse: http://localhost:5173/admin
2. Login:
   - **Usuário**: `admin`
   - **Senha**: (a senha que você definiu no passo 3)
3. Veja os orçamentos enviados
4. Teste filtros e exportação

### 3. Registro de Acesso
1. Acesse: http://localhost:5173/access-log
2. Deixe um registro
3. Veja aparecer na lista em tempo real

## 🔒 Credenciais Padrão (DESENVOLVIMENTO)

Se você pulou o passo de gerar credenciais, use estas (APENAS PARA TESTES):

- **Admin Usuário**: `admin`
- **Admin Senha**: `password`
- **Hash já incluído no config.php**

⚠️ **MUDE ESTAS CREDENCIAIS ANTES DE COLOCAR EM PRODUÇÃO!**

## 🐛 Problemas Comuns

### Erro: "Connection failed"
- ✅ Verifique se o MySQL está rodando
- ✅ Confira as credenciais em `config.php`
- ✅ Teste a conexão manualmente

### Erro: "CORS Error"
- ✅ Adicione seu domínio em `ALLOWED_ORIGINS` no `config.php`
- ✅ Reinicie o servidor PHP

### Formulário não envia
- ✅ Verifique se o backend PHP está rodando (porta 8000)
- ✅ Abra o console do navegador (F12) e veja os erros
- ✅ Verifique o `vite.config.ts` tem o proxy correto

### Login admin não funciona
- ✅ Verifique se a senha está hasheada corretamente
- ✅ Use o script `generate-credentials.php`
- ✅ Veja os logs do PHP para mais detalhes

## 📚 Documentação Completa

Para informações detalhadas, consulte:
- `/IMPLEMENTATION_COMPLETE.md` - Documentação completa
- `/backend/PHP_SETUP.md` - Setup detalhado do PHP

## 🎨 Páginas Disponíveis

- **/** - Home (Hero + Valores)
- **/about** - Sobre + Fundadores + Valores
- **/services** - Serviços
- **/community** - Comunidade
- **/contact** - Formulário de Orçamento
- **/access-log** - Registro de Acesso
- **/admin** - Painel Administrativo
- **/terms** - Termos de Uso
- **/privacy** - Política de Privacidade

## 💡 Dicas Úteis

### Ver logs do PHP
```bash
# Durante desenvolvimento, erros aparecem no terminal
# Em produção, veja em:
tail -f /var/log/php_errors.log
```

### Limpar rate limiting (desenvolvimento)
```sql
TRUNCATE TABLE rate_limit;
```

### Resetar senha admin
```bash
# Gere novo hash
php -r "echo password_hash('nova_senha', PASSWORD_BCRYPT);"

# Atualize no config.php
```

### Backup do banco
```bash
mysqldump -u terminal404_user -p terminal404_db > backup_$(date +%Y%m%d).sql
```

## 🚀 Deploy em Produção

Quando estiver pronto para produção:

1. ✅ Mude `DEBUG_MODE` para `false`
2. ✅ Use HTTPS (SSL/TLS)
3. ✅ Gere novas credenciais fortes
4. ✅ Configure domínios corretos em `ALLOWED_ORIGINS`
5. ✅ Ajuste rate limiting para produção
6. ✅ Configure backups automáticos
7. ✅ Monitore logs de segurança

## 📞 Suporte

Precisa de ajuda?
- 📧 E-mail: terminallocal404@gmail.com
- 💬 WhatsApp: (32) 99154-7944

---

**Terminal 404** | Cyberpunk Tech  
Desenvolvido por Griffith, Lauferistor e Xuehe

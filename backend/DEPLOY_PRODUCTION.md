# 🚀 Terminal 404 - Guia de Deploy em Produção

## 📋 Pré-requisitos

- Servidor Linux (Ubuntu 20.04+ / Debian 10+ / CentOS 8+)
- Python 3.8 ou superior
- Nginx ou Apache (recomendado: Nginx)
- Domínio configurado (opcional mas recomendado)
- Certificado SSL (Let's Encrypt recomendado)

---

## 🔧 Passo 1: Preparar o Servidor

### Atualizar sistema

```bash
sudo apt update
sudo apt upgrade -y
```

### Instalar dependências

```bash
# Python e pip
sudo apt install python3 python3-pip python3-venv -y

# Nginx
sudo apt install nginx -y

# Certbot (SSL)
sudo apt install certbot python3-certbot-nginx -y

# Git
sudo apt install git -y
```

---

## 📦 Passo 2: Deploy do Backend

### 1. Criar usuário de deploy (recomendado)

```bash
sudo useradd -m -s /bin/bash terminal404
sudo usermod -aG www-data terminal404
```

### 2. Clonar o repositório

```bash
sudo mkdir -p /var/www/terminal404
sudo chown terminal404:www-data /var/www/terminal404
sudo -u terminal404 git clone https://github.com/seu-usuario/terminal-404.git /var/www/terminal404
```

### 3. Configurar o backend

```bash
cd /var/www/terminal404/backend

# Criar ambiente virtual
sudo -u terminal404 python3 -m venv venv

# Ativar ambiente virtual
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
sudo -u terminal404 cp .env.example .env
sudo -u terminal404 nano .env
```

### 4. Configurar .env para produção

```env
# Flask Configuration
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
FLASK_DEBUG=False

# SMTP Email Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=terminallocal404@gmail.com
SMTP_PASS=sua_senha_de_app_aqui
ADMIN_EMAIL=terminallocal404@gmail.com

# CORS Configuration (seus domínios)
ALLOWED_ORIGINS=https://terminal404.com,https://www.terminal404.com

# Security
IP_HASH_SALT=gere_string_aleatoria_unica_aqui_123456789
```

### 5. Gerar salt aleatório

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
# Cole o resultado em IP_HASH_SALT
```

### 6. Criar diretórios de log

```bash
sudo mkdir -p /var/log/terminal404
sudo chown terminal404:www-data /var/log/terminal404
```

---

## 🔄 Passo 3: Configurar Systemd Service

### 1. Copiar e editar service file

```bash
sudo cp /var/www/terminal404/backend/systemd.service.example /etc/systemd/system/terminal404-backend.service
sudo nano /etc/systemd/system/terminal404-backend.service
```

### 2. Ajustar caminhos no service file

Certifique-se de que os caminhos estão corretos:
- `WorkingDirectory=/var/www/terminal404/backend`
- `Environment="PATH=/var/www/terminal404/backend/venv/bin"`
- `ExecStart=/var/www/terminal404/backend/venv/bin/gunicorn ...`

### 3. Habilitar e iniciar o serviço

```bash
sudo systemctl daemon-reload
sudo systemctl enable terminal404-backend
sudo systemctl start terminal404-backend
```

### 4. Verificar status

```bash
sudo systemctl status terminal404-backend
```

Deve mostrar: `Active: active (running)`

---

## 🌐 Passo 4: Configurar Nginx como Reverse Proxy

### 1. Criar configuração do Nginx

```bash
sudo nano /etc/nginx/sites-available/terminal404
```

### 2. Adicionar configuração

```nginx
# Terminal 404 Backend - Nginx Configuration

# Redirecionar HTTP para HTTPS (após configurar SSL)
server {
    listen 80;
    listen [::]:80;
    server_name api.terminal404.com;
    
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.terminal404.com;

    # SSL Configuration (será preenchido pelo Certbot)
    # ssl_certificate /etc/letsencrypt/live/api.terminal404.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/api.terminal404.com/privkey.pem;
    # include /etc/letsencrypt/options-ssl-nginx.conf;
    # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logging
    access_log /var/log/nginx/terminal404-access.log;
    error_log /var/log/nginx/terminal404-error.log;

    # Rate Limiting (adicional ao Flask)
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req zone=api_limit burst=20 nodelay;

    # Proxy para Flask
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffering
        proxy_buffering off;
        proxy_request_buffering off;
    }

    # Health check endpoint (sem rate limit)
    location /api/health {
        proxy_pass http://127.0.0.1:5000;
        access_log off;
    }
}
```

### 3. Habilitar site

```bash
sudo ln -s /etc/nginx/sites-available/terminal404 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 Passo 5: Configurar SSL com Let's Encrypt

```bash
# Obter certificado SSL
sudo certbot --nginx -d api.terminal404.com

# Renovação automática (já configurado, mas verifique)
sudo certbot renew --dry-run
```

---

## 📊 Passo 6: Monitoramento e Logs

### Ver logs do backend

```bash
# Logs do systemd
sudo journalctl -u terminal404-backend -f

# Logs da aplicação
tail -f /var/www/terminal404/backend/security.log
tail -f /var/www/terminal404/backend/security_events.log

# Logs do Nginx
tail -f /var/log/nginx/terminal404-access.log
tail -f /var/log/nginx/terminal404-error.log
```

### Comandos úteis

```bash
# Status do serviço
sudo systemctl status terminal404-backend

# Reiniciar backend
sudo systemctl restart terminal404-backend

# Parar backend
sudo systemctl stop terminal404-backend

# Iniciar backend
sudo systemctl start terminal404-backend

# Ver últimos 100 logs
sudo journalctl -u terminal404-backend -n 100

# Recarregar Nginx
sudo systemctl reload nginx
```

---

## 🔄 Passo 7: Deploy do Frontend

### Opção A: Build Local e Upload

```bash
# No seu computador local
cd /caminho/para/terminal404
npm run build

# Upload para servidor (usando scp)
scp -r dist/* usuario@seu-servidor:/var/www/terminal404/frontend/
```

### Opção B: Build no Servidor

```bash
# No servidor
cd /var/www/terminal404
sudo apt install nodejs npm -y
npm install
npm run build
```

### Configurar Nginx para Frontend

```nginx
# Adicionar ao arquivo /etc/nginx/sites-available/terminal404

server {
    listen 80;
    listen [::]:80;
    server_name terminal404.com www.terminal404.com;
    
    root /var/www/terminal404/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
```

---

## 🧪 Passo 8: Testar Deploy

### 1. Testar backend

```bash
# Health check
curl https://api.terminal404.com/api/health

# Testar envio de log
curl -X POST https://api.terminal404.com/api/send-access-log \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","message":"Testing production deployment"}'
```

### 2. Testar frontend

```bash
# Acessar no navegador
https://terminal404.com
```

---

## 🔐 Passo 9: Hardening de Segurança

### Firewall (UFW)

```bash
sudo ufw allow 22/tcp     # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS
sudo ufw enable
```

### Fail2Ban (proteção contra brute force)

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### Atualizações automáticas

```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

---

## 📅 Manutenção Regular

### Diária
- Verificar logs de erro
- Monitorar uso de recursos (CPU, RAM, disco)

### Semanal
- Verificar logs de segurança
- Revisar IPs bloqueados
- Verificar backups

### Mensal
- Atualizar dependências do sistema
- Atualizar dependências Python
- Revisar métricas de performance
- Testar recuperação de desastres

### Comandos de Manutenção

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Atualizar dependências Python
cd /var/www/terminal404/backend
source venv/bin/activate
pip install --upgrade -r requirements.txt

# Limpar logs antigos (se necessário)
sudo find /var/log/terminal404 -name "*.log" -type f -mtime +30 -delete

# Verificar espaço em disco
df -h

# Verificar uso de memória
free -h

# Ver processos do backend
ps aux | grep gunicorn
```

---

## 🆘 Troubleshooting

### Backend não inicia

```bash
# Verificar logs
sudo journalctl -u terminal404-backend -n 50

# Verificar configuração
cd /var/www/terminal404/backend
source venv/bin/activate
python app.py  # Testar manualmente
```

### E-mails não funcionam

```bash
# Verificar SMTP_PASS no .env
cat /var/www/terminal404/backend/.env | grep SMTP_PASS

# Testar conexão SMTP
python3 -c "import smtplib; smtplib.SMTP('smtp.gmail.com', 587).starttls(); print('OK')"
```

### Nginx retorna 502 Bad Gateway

```bash
# Verificar se backend está rodando
sudo systemctl status terminal404-backend

# Verificar se porta 5000 está em uso
sudo netstat -tlnp | grep 5000

# Verificar logs do Nginx
tail -f /var/log/nginx/terminal404-error.log
```

---

## 📞 Suporte

Para problemas ou dúvidas:
- Email: terminallocal404@gmail.com
- GitHub Issues: https://github.com/seu-usuario/terminal-404/issues

---

## ✅ Checklist Final de Deploy

- [ ] Backend instalado e configurado
- [ ] .env configurado com credenciais reais
- [ ] Systemd service habilitado e rodando
- [ ] Nginx configurado como reverse proxy
- [ ] SSL/HTTPS configurado com Let's Encrypt
- [ ] Frontend buildado e servido
- [ ] Firewall configurado (UFW)
- [ ] Fail2Ban instalado
- [ ] Logs sendo gerados corretamente
- [ ] Health check respondendo
- [ ] E-mails sendo enviados
- [ ] Domínio apontando para o servidor
- [ ] Backups configurados
- [ ] Monitoramento configurado

---

**🎉 Deploy Concluído! Seu Terminal 404 está no ar! 🚀**

---

**Terminal 404** - Desenvolvimento web de alta performance com estética cyberpunk

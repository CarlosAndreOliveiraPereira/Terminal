# Manual de Instalação e Deploy - Terminal 404 (Python Core v3.0)

Este projeto agora utiliza um backend **100% Python** (Flask) para alta performance, segurança e robustez corporativa.

## Arquitetura
- **Frontend**: React + TailwindCSS (Single Page Application)
- **Backend**: Python (Flask) + Rate Limiting + Logging
- **Comunicação**: API REST via `/api/`

---

## 1. Requisitos do Sistema

- **Python 3.9** ou superior
- **Node.js 18+** (para build do frontend)
- **Pip** (gerenciador de pacotes Python)
- Servidor Linux (Ubuntu 20.04+ recomendado)

---

## 2. Instalação Local (Desenvolvimento)

### Backend (Python)
1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```
2. Crie um ambiente virtual (recomendado):
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # ou
   venv\Scripts\activate     # Windows
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
4. Execute o servidor:
   ```bash
   python app.py
   ```
   *O servidor rodará em http://localhost:5000*

### Frontend (React)
1. Na raiz do projeto:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   *O site rodará em http://localhost:5173 e fará proxy automático para o backend.*

---

## 3. Deploy em Produção (VPS - Digital Ocean / AWS)

### A. Configurando o Backend (Gunicorn + Systemd)

1. **Upload**: Envie a pasta `backend` para o servidor (ex: `/var/www/terminal404/backend`).
2. **Dependências**:
   ```bash
   cd /var/www/terminal404/backend
   pip3 install -r requirements.txt
   pip3 install gunicorn
   ```
3. **Variáveis de Ambiente**:
   Crie um arquivo `.env` na pasta backend com suas credenciais de e-mail:
   ```env
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=seu-email@gmail.com
   SMTP_PASS=sua-senha-app
   ```
4. **Serviço Systemd**:
   Crie `/etc/systemd/system/terminal404-backend.service`:
   ```ini
   [Unit]
   Description=Gunicorn instance to serve Terminal404 API
   After=network.target

   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/var/www/terminal404/backend
   Environment="PATH=/var/www/terminal404/backend/venv/bin"
   ExecStart=/usr/local/bin/gunicorn --workers 3 --bind 127.0.0.1:5000 app:app

   [Install]
   WantedBy=multi-user.target
   ```
   *Inicie o serviço:* `sudo systemctl start terminal404-backend`

### B. Configurando o Frontend (Nginx)

1. **Build**:
   Na sua máquina local ou servidor de build:
   ```bash
   npm run build
   ```
2. **Upload**: Envie o conteúdo da pasta `dist` para `/var/www/terminal404/frontend`.
3. **Configuração Nginx** (`/etc/nginx/sites-available/terminal404`):

   ```nginx
   server {
       listen 80;
       server_name seu-dominio.com;

       root /var/www/terminal404/frontend;
       index index.html;

       # Frontend (SPA Support)
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Backend Proxy
       location /api {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```

---

## Segurança Implementada

1. **Rate Limiting**: O backend limita requisições abusivas (5 por minuto no endpoint de log).
2. **Sanitização**: Inputs são limpos antes do processamento.
3. **Logs**: Todas as requisições são logadas em arquivo e console.
4. **CORS**: Configurado para aceitar origens seguras.

---

## Solução de Problemas

- **Erro de Conexão (Frontend -> Backend)**: Verifique se o Gunicorn está rodando na porta 5000 (`netstat -plnt`).
- **E-mail não chega**: Verifique as credenciais SMTP e se a "Senha de App" do Google está correta.
- **Log de Erros**: Verifique `backend/app.log` ou `journalctl -u terminal404-backend`.

# 🌐 Terminal 404

> **Desenvolvimento web de alta performance com estética cyberpunk**

Website corporativo moderno desenvolvido com **React**, **Tailwind CSS v4** e backend **Python Flask** ultra-seguro.

![Version](https://img.shields.io/badge/version-4.0.0-00E5FF)
![Python](https://img.shields.io/badge/python-3.8+-blue)
![React](https://img.shields.io/badge/react-18+-61DAFB)
![Security](https://img.shields.io/badge/security-hardened-green)

---

## ✨ Características

### Frontend
- ⚡ **React 18** com TypeScript
- 🎨 **Tailwind CSS v4** para estilização moderna
- 🛣️ **React Router** para navegação multi-página
- 🎭 **Design Cyberpunk** com animações fluidas
- 📱 **Responsivo** em todos os dispositivos
- 🔥 **Performance otimizada** com Vite

### Backend Python Ultra-Seguro
- 🐍 **Flask** framework robusto
- 🔐 **Multi-layered security** (10+ camadas de proteção)
- 🛡️ **Rate Limiting** avançado
- 📧 **Sistema de e-mail** seguro com SMTP
- 📊 **Logging detalhado** para auditoria
- 🔒 **LGPD/GDPR compliant** (hash de IPs)
- ⚡ **Request tracking** com IDs únicos
- 🚫 **IP Blacklisting** automático
- ✅ **Input validation & sanitization**
- 🔐 **Security headers** configurados

---

## 📁 Estrutura do Projeto

```
terminal-404/
├── backend/                    # Backend Python Flask
│   ├── app.py                 # Aplicação principal (4.0.0)
│   ├── requirements.txt       # Dependências Python
│   ├── .env.example          # Template de configuração
│   ├── deploy.sh             # Script de deploy automatizado
│   ├── test_api.py           # Suite de testes
│   ├── README.md             # Documentação do backend
│   └── SECURITY.md           # Documentação de segurança
│
├── src/
│   ├── app/
│   │   ├── components/       # Componentes React
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Owners.tsx    # Seção dos fundadores
│   │   │   └── ...
│   │   ├── pages/            # Páginas do site
│   │   │   ├── Home.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ServicesPage.tsx
│   │   │   └── ...
│   │   └── App.tsx           # Componente principal
│   │
│   └── styles/               # Estilos globais
│       ├── index.css
│       ├── tailwind.css
│       └── theme.css
│
├── package.json
├── vite.config.ts
└── README.md                 # Este arquivo
```

---

## 🚀 Início Rápido

### Pré-requisitos

- **Node.js** 16+ e npm/pnpm
- **Python** 3.8+
- **Git**

### Instalação

#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/terminal-404.git
cd terminal-404
```

#### 2. Configure o Frontend

```bash
# Instalar dependências
npm install
# ou
pnpm install

# Iniciar em desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

#### 3. Configure o Backend

```bash
cd backend

# Método automático (recomendado)
chmod +x deploy.sh
./deploy.sh

# OU método manual:
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate no Windows

pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

#### 4. Configure Credenciais do Gmail

Para que o backend possa enviar e-mails:

1. Acesse: https://myaccount.google.com/apppasswords
2. Ative autenticação de 2 fatores (se ainda não ativado)
3. Crie uma senha de app para "Terminal404"
4. Cole a senha no campo `SMTP_PASS` do arquivo `.env`

#### 5. Inicie o Backend

```bash
# Desenvolvimento
python app.py

# Produção com Gunicorn (recomendado)
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

O backend estará disponível em `http://localhost:5000`

---

## 🧪 Testes

### Testar Backend

```bash
cd backend

# Executar suite de testes automatizada
python test_api.py

# Verificar logs
tail -f security.log
tail -f security_events.log
```

### Endpoints Disponíveis

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/health` | GET | Health check |
| `/api/send-access-log` | POST | Enviar log de acesso |

---

## 🔐 Segurança

O backend implementa **10+ camadas de segurança**:

1. ✅ **Security Headers** (HSTS, CSP, X-Frame-Options, etc)
2. ✅ **Rate Limiting** (3 req/min para logs, 100/dia global)
3. ✅ **Input Validation & Sanitization** (bleach library)
4. ✅ **IP Blacklisting** (automático após 5 falhas)
5. ✅ **Spam Detection** (URLs, caps lock, caracteres repetidos)
6. ✅ **Request Size Limiting** (10KB máximo)
7. ✅ **Privacy Protection** (hash de IPs para LGPD/GDPR)
8. ✅ **Secure Error Handling** (sem vazamento de informações)
9. ✅ **Request Tracking** (IDs únicos para auditoria)
10. ✅ **CORS Protection** (origens configuráveis)

Para mais detalhes, consulte: [backend/SECURITY.md](backend/SECURITY.md)

---

## 👥 Fundadores

O Terminal 404 foi criado por três desenvolvedores apaixonados por tecnologia e design:

- **Co-Founder** - Chief Technology Officer (Backend & Security)
- **Co-Founder** - Lead Developer (Full Stack Development)
- **Co-Founder** - Chief Executive Officer (Strategy & Innovation)

A seção "Fundadores" está visível no rodapé do site com fotos e informações dos criadores.

---

## 📦 Deploy em Produção

### Frontend (Netlify/Vercel)

```bash
# Build de produção
npm run build

# A pasta dist/ estará pronta para deploy
```

### Backend (VPS/Cloud)

```bash
# 1. Clone o repositório no servidor
git clone https://github.com/seu-usuario/terminal-404.git
cd terminal-404/backend

# 2. Execute o script de deploy
chmod +x deploy.sh
./deploy.sh

# 3. Configure .env com credenciais reais

# 4. Use PM2 ou systemd para manter rodando
pm2 start "gunicorn -w 4 -b 0.0.0.0:5000 app:app" --name terminal404-backend

# OU configure como serviço systemd
```

### Checklist de Produção

- [ ] `FLASK_DEBUG=False` no `.env`
- [ ] Configurar `ALLOWED_ORIGINS` específicas
- [ ] Usar HTTPS (certificado SSL)
- [ ] Configurar firewall
- [ ] Configurar backup de logs
- [ ] Monitorar recursos do servidor
- [ ] Configurar domínio personalizado

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Tailwind CSS v4
- React Router
- Vite
- Lucide React (ícones)

### Backend
- Python 3.8+
- Flask 3.0.0
- Flask-Limiter (rate limiting)
- Flask-CORS (CORS protection)
- Bleach (sanitização)
- Gunicorn (production server)

---

## 📝 Scripts Disponíveis

### Frontend

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Verificar código
```

### Backend

```bash
python app.py        # Iniciar servidor
python test_api.py   # Executar testes
./deploy.sh          # Deploy automatizado
```

---

## 🐛 Troubleshooting

### Backend não envia e-mails
- Verifique se `SMTP_PASS` está configurado no `.env`
- Confirme que a senha de app do Gmail está correta
- Verifique logs em `security.log`

### Rate Limit Exceeded
- Aguarde alguns minutos
- Em desenvolvimento, aumente os limites em `app.py`

### Frontend não conecta ao backend
- Verifique se o backend está rodando
- Confirme a URL do backend no código do frontend
- Verifique configuração de CORS

---

## 📄 Licença

© 2025 Terminal 404 - Todos os direitos reservados.

---

## 📞 Contato

- **Email**: terminallocal404@gmail.com
- **GitHub**: https://github.com/Terminllocal404
- **LinkedIn**: https://www.linkedin.com/in/terminal-i-48a2a53a6/
- **WhatsApp**: +55 32 9154-7944

---

## 🔄 Changelog

### v4.0.0 (2025-02-16)

**Backend:**
- ✨ Reescrita completa do backend
- 🔐 Implementação de 10+ camadas de segurança
- 🛡️ Sistema de blacklist de IPs
- 📧 Sistema robusto de envio de e-mails
- 🔍 Logging detalhado com Request IDs
- ✅ Validação e sanitização avançadas
- 📊 Hash de IPs para privacidade (LGPD/GDPR)
- 🚀 Headers de segurança configurados

**Frontend:**
- ✨ Adicionado componente "Fundadores" no footer
- 🎨 Design cyberpunk aprimorado
- 📱 Melhorias de responsividade
- ⚡ Otimizações de performance

---

**Desenvolvido com 💙 e ⚡ pela equipe Terminal 404**

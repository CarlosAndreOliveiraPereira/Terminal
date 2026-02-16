# ✅ Terminal 404 - Checklist de Configuração

Use este checklist para garantir que tudo está configurado corretamente.

---

## 📋 Configuração Inicial

### Frontend

- [ ] Node.js instalado (versão 16+)
  ```bash
  node --version
  ```

- [ ] Dependências instaladas
  ```bash
  npm install
  # ou
  pnpm install
  ```

- [ ] Frontend inicia sem erros
  ```bash
  npm run dev
  ```

- [ ] Navegador abre em http://localhost:5173

- [ ] Todas as páginas carregam corretamente:
  - [ ] Home (/)
  - [ ] Sobre (/about)
  - [ ] Serviços (/services)
  - [ ] Comunidade (/community)
  - [ ] Contato (/contact)
  - [ ] Termos (/terms)
  - [ ] Privacidade (/privacy)

- [ ] Seção "Fundadores" visível no footer com 3 fotos

---

### Backend

- [ ] Python 3.8+ instalado
  ```bash
  python3 --version
  ```

- [ ] Virtual environment criado
  ```bash
  cd backend
  python3 -m venv venv
  ```

- [ ] Virtual environment ativado
  ```bash
  source venv/bin/activate  # Linux/Mac
  # ou
  venv\Scripts\activate  # Windows
  ```

- [ ] Dependências instaladas
  ```bash
  pip install -r requirements.txt
  ```

- [ ] Arquivo .env criado e configurado
  ```bash
  cp .env.example .env
  nano .env  # ou vim, code, etc
  ```

- [ ] SMTP_PASS configurado no .env
  - [ ] Acesse: https://myaccount.google.com/apppasswords
  - [ ] Crie senha de app
  - [ ] Cole no .env

- [ ] Health check passa
  ```bash
  python healthcheck.py
  ```

- [ ] Backend inicia sem erros
  ```bash
  python app.py
  ```

- [ ] Health endpoint responde
  ```bash
  curl http://localhost:5000/api/health
  ```

- [ ] Testes automatizados passam
  ```bash
  python test_api.py
  ```

---

## 🔐 Configuração de Segurança

### Variáveis de Ambiente Críticas

- [ ] `SMTP_PASS` configurado (obrigatório para e-mails)
- [ ] `IP_HASH_SALT` alterado (recomendado para produção)
- [ ] `FLASK_DEBUG=False` (obrigatório em produção)
- [ ] `ALLOWED_ORIGINS` configurado (recomendado em produção)

### Arquivo .env Exemplo

```env
# Flask Configuration
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
FLASK_DEBUG=False

# SMTP Email Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=terminallocal404@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # ← Configure isto!
ADMIN_EMAIL=terminallocal404@gmail.com

# CORS Configuration
ALLOWED_ORIGINS=https://terminal404.com,https://www.terminal404.com

# Security
IP_HASH_SALT=gere_um_valor_aleatorio_aqui_123456789
```

---

## 🧪 Testes de Funcionalidade

### Frontend

- [ ] Menu de navegação funciona
- [ ] Links externos abrem corretamente
- [ ] Formulários validam corretamente
- [ ] Animações funcionam suavemente
- [ ] Site é responsivo em mobile
- [ ] Site é responsivo em tablet
- [ ] Site é responsivo em desktop

### Backend

- [ ] Health endpoint retorna status 200
  ```bash
  curl http://localhost:5000/api/health
  ```

- [ ] Endpoint de log aceita requisições válidas
  ```bash
  curl -X POST http://localhost:5000/api/send-access-log \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User","message":"This is a test message from the setup checklist"}'
  ```

- [ ] Rate limiting funciona (429 após muitas requisições)

- [ ] Validação rejeita dados inválidos (400 para campos vazios)

- [ ] E-mails são enviados corretamente

- [ ] Logs são gerados em `security.log`

---

## 📊 Verificações de Performance

### Frontend

- [ ] Build de produção funciona
  ```bash
  npm run build
  ```

- [ ] Preview do build funciona
  ```bash
  npm run preview
  ```

- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 90 (Accessibility)
- [ ] Lighthouse score > 90 (Best Practices)
- [ ] Lighthouse score > 90 (SEO)

### Backend

- [ ] Servidor responde em < 100ms (health check)
- [ ] Servidor processa logs em < 2s
- [ ] Memória RAM estável sob carga
- [ ] CPU usage < 50% em idle

---

## 🚀 Preparação para Deploy

### Desenvolvimento Local ✅

- [ ] Frontend e backend funcionam localmente
- [ ] Todos os testes passam
- [ ] Documentação revisada
- [ ] Código commitado no Git

### Staging (Opcional)

- [ ] Deploy em ambiente de staging
- [ ] Testes de integração executados
- [ ] Performance verificada
- [ ] Segurança testada

### Produção

- [ ] Domínio configurado
- [ ] DNS apontando para servidor
- [ ] SSL/TLS certificado instalado
- [ ] Nginx configurado como reverse proxy
- [ ] Systemd service configurado
- [ ] Firewall configurado (portas 80, 443)
- [ ] Fail2Ban instalado
- [ ] Backups configurados
- [ ] Monitoramento configurado
- [ ] Logs rotacionados
- [ ] Alertas configurados

---

## 📝 Documentação

- [ ] README.md lido
- [ ] QUICKSTART.md seguido
- [ ] SECURITY.md revisado
- [ ] DEPLOY_PRODUCTION.md consultado (se deploy em prod)
- [ ] CONTRIBUTING.md lido (se contribuindo)

---

## 🔄 Manutenção Regular

### Diária
- [ ] Verificar logs de erro
- [ ] Monitorar uso de recursos

### Semanal
- [ ] Verificar logs de segurança
- [ ] Revisar IPs bloqueados
- [ ] Verificar backups

### Mensal
- [ ] Atualizar dependências
  ```bash
  npm update  # Frontend
  pip install --upgrade -r requirements.txt  # Backend
  ```
- [ ] Revisar métricas de performance
- [ ] Testar recuperação de desastres

---

## ✨ Funcionalidades Implementadas

### ✅ Concluído

- [x] Design cyberpunk completo
- [x] 7 páginas navegáveis
- [x] Seção de fundadores com 3 fotos
- [x] Backend Python seguro (10+ camadas)
- [x] Sistema de e-mails
- [x] Rate limiting
- [x] Validação de inputs
- [x] Logging detalhado
- [x] Testes automatizados
- [x] Documentação completa
- [x] Scripts de deploy
- [x] Health check system

---

## 🆘 Troubleshooting Rápido

### Frontend não inicia
```bash
# Remover node_modules e reinstalar
rm -rf node_modules
npm install
npm run dev
```

### Backend não inicia
```bash
# Verificar Python
python3 --version

# Reinstalar dependências
pip install -r requirements.txt

# Verificar .env
cat .env | grep SMTP_PASS
```

### E-mails não funcionam
```bash
# Verificar configuração SMTP
python3 -c "
import os
from dotenv import load_dotenv
load_dotenv()
print('SMTP_USER:', os.getenv('SMTP_USER'))
print('SMTP_PASS:', 'Configurado' if os.getenv('SMTP_PASS') else 'NÃO CONFIGURADO')
"
```

### Porta já em uso
```bash
# Encontrar processo na porta 5000
lsof -i :5000

# Matar processo
kill -9 <PID>
```

---

## 📞 Precisa de Ajuda?

Se algum item do checklist falhou:

1. **Consulte a documentação**:
   - README.md
   - QUICKSTART.md
   - backend/README.md
   - backend/SECURITY.md

2. **Execute health check**:
   ```bash
   cd backend
   python healthcheck.py
   ```

3. **Execute testes**:
   ```bash
   cd backend
   python test_api.py
   ```

4. **Entre em contato**:
   - Email: terminallocal404@gmail.com
   - GitHub Issues

---

## 🎉 Checklist Completo!

Se você marcou todos os itens relevantes:

**🚀 Parabéns! O Terminal 404 está pronto para uso!**

### Próximos Passos:

1. **Desenvolvimento**:
   ```bash
   # Terminal 1: Frontend
   npm run dev
   
   # Terminal 2: Backend
   cd backend
   make dev
   ```

2. **Produção**:
   - Consulte `DEPLOY_PRODUCTION.md`
   - Configure servidor
   - Deploy!

---

**Terminal 404** - Desenvolvimento web de alta performance com estética cyberpunk 🚀⚡🔐

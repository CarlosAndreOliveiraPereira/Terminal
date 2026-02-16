# 🚀 Terminal 404 - Guia Rápido de Início

## ⚡ Início Rápido em 5 Minutos

### Passo 1: Frontend

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev
```

✅ Frontend rodando em: http://localhost:5173

---

### Passo 2: Backend

```bash
cd backend

# Opção A: Script Automatizado (Recomendado) 🎯
chmod +x deploy.sh
./deploy.sh
# Escolha opção 1 (Development Mode)

# Opção B: Manual
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

✅ Backend rodando em: http://localhost:5000

---

### Passo 3: Configurar E-mail (Opcional mas recomendado)

1. **Acesse**: https://myaccount.google.com/apppasswords
2. **Crie** senha de app
3. **Edite** `backend/.env`:
   ```env
   SMTP_PASS=sua_senha_de_app_aqui
   ```

✅ E-mails configurados!

---

## 🧪 Testar Tudo

```bash
# Testar backend
cd backend
python test_api.py

# Acessar frontend
# Abra http://localhost:5173 no navegador
```

---

## 📱 Visualizar no Navegador

1. **Home**: http://localhost:5173
2. **Sobre**: http://localhost:5173/about
3. **Serviços**: http://localhost:5173/services
4. **Comunidade**: http://localhost:5173/community
5. **Contato**: http://localhost:5173/contact

Desça até o **footer** para ver a seção **Fundadores** com as 3 fotos!

---

## 🎨 Recursos Implementados

### ✅ Frontend
- Design cyberpunk completo
- Navegação multi-página
- Seção de fundadores no footer
- Animações e efeitos visuais
- 100% responsivo

### ✅ Backend
- API REST segura
- 10+ camadas de segurança
- Rate limiting
- Validação de inputs
- Sistema de logs
- Envio de e-mails

---

## 🔧 Comandos Úteis

```bash
# Frontend
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run preview      # Preview build

# Backend
python app.py        # Iniciar servidor
python test_api.py   # Testes
tail -f security.log # Ver logs
```

---

## ❓ Problemas Comuns

### Backend não inicia
```bash
# Verificar Python
python3 --version

# Reinstalar dependências
pip install -r requirements.txt
```

### Frontend não conecta ao backend
- Certifique-se que o backend está rodando em http://localhost:5000
- Verifique o console do navegador para erros

### E-mails não funcionam
- Verifique se SMTP_PASS está configurado no .env
- Confirme que usou senha de APP do Gmail (não a senha normal)

---

## 📖 Documentação Completa

- **README.md**: Documentação completa
- **backend/README.md**: Documentação do backend
- **backend/SECURITY.md**: Detalhes de segurança

---

## 🎉 Pronto!

Você agora tem:
- ✅ Frontend React rodando
- ✅ Backend Python seguro rodando
- ✅ Seção de fundadores implementada
- ✅ Sistema de e-mails (se configurado)

**Divirta-se desenvolvendo! 🚀**

---

**Terminal 404** - Desenvolvimento web de alta performance com estética cyberpunk

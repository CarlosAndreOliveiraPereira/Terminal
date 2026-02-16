# Terminal 404 - Secure Backend API

Backend Python robusto e seguro para o Terminal 404, desenvolvido com Flask e múltiplas camadas de proteção.

## 🔐 Recursos de Segurança

### Implementações de Segurança

1. **Headers de Segurança Avançados**
   - X-Content-Type-Options
   - X-Frame-Options (DENY)
   - X-XSS-Protection
   - Strict-Transport-Security (HSTS)
   - Content-Security-Policy
   - Referrer-Policy
   - Permissions-Policy

2. **Rate Limiting Multi-Camada**
   - Limite global: 100 requisições/dia, 30 requisições/hora
   - Limite específico para logs: 3 requisições/minuto
   - Estratégia fixed-window para prevenção de abuse

3. **Validação e Sanitização de Inputs**
   - Validação rigorosa de todos os campos
   - Sanitização com biblioteca bleach
   - Remoção de HTML/scripts maliciosos
   - Detecção de padrões de spam
   - Limite de tamanho de requisição (10KB)

4. **Sistema de Blacklist de IPs**
   - Rastreamento de tentativas falhas
   - Blacklist automática após 5 tentativas
   - Duração de blacklist: 1 hora

5. **Logging de Segurança**
   - Logs separados para eventos de segurança
   - Hash de IPs para compliance com LGPD/GDPR
   - Request ID único para rastreamento
   - Logs detalhados de todas as operações

6. **Proteção de E-mails**
   - Timeout em conexões SMTP
   - Tratamento robusto de erros
   - Validação de credenciais
   - Templates HTML seguros

## 🚀 Instalação

### Pré-requisitos
- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)
- make (opcional, mas recomendado)

### Passos de Instalação

#### Opção A: Com Makefile (Recomendado) ⚡

```bash
# Configuração completa (cria venv, instala deps, cria .env)
make setup

# Verificar saúde do sistema
make health

# Iniciar em desenvolvimento
make dev
```

#### Opção B: Script de Deploy

```bash
chmod +x deploy.sh
./deploy.sh
```

#### Opção C: Manual

1. **Clone o repositório e navegue até a pasta backend**
```bash
cd backend
```

2. **Crie um ambiente virtual (recomendado)**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

3. **Instale as dependências**
```bash
pip install -r requirements.txt
```

4. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

5. **Configure a senha do Gmail**
   - Acesse: https://myaccount.google.com/apppasswords
   - Crie uma senha de app para "Terminal404"
   - Cole a senha no campo `SMTP_PASS` do arquivo `.env`

## ▶️ Execução

### Modo Desenvolvimento
```bash
python app.py
```

### Modo Produção (com Gunicorn)
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Com Workers e Timeout
```bash
gunicorn -w 4 -b 0.0.0.0:5000 --timeout 30 --access-logfile - --error-logfile - app:app
```

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Verifica o status da API.

**Resposta:**
```json
{
  "status": "healthy",
  "version": "4.0.0",
  "timestamp": "2025-02-16T10:30:00"
}
```

### Send Access Log
```
POST /api/send-access-log
```

Processa e envia logs de acesso.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Nome do Usuário",
  "message": "Mensagem do log de acesso"
}
```

**Validações:**
- `name`: 2-100 caracteres
- `message`: 10-2000 caracteres
- Não pode conter URLs
- Não pode ter caracteres repetidos excessivamente
- Não pode ter texto todo em maiúsculas

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Access log processed successfully",
  "request_id": "unique_request_id",
  "timestamp": "2025-02-16 10:30:00"
}
```

**Resposta de Erro:**
```json
{
  "success": false,
  "error": "Error message",
  "request_id": "unique_request_id"
}
```

## 🛡️ Segurança em Produção

### Checklist de Deploy

- [ ] Alterar `FLASK_DEBUG=False` no `.env`
- [ ] Definir `IP_HASH_SALT` único e aleatório
- [ ] Configurar `ALLOWED_ORIGINS` com domínios específicos
- [ ] Usar HTTPS (certificado SSL/TLS)
- [ ] Configurar firewall para bloquear portas não utilizadas
- [ ] Manter dependências atualizadas (`pip list --outdated`)
- [ ] Configurar rotação de logs
- [ ] Implementar backup dos logs
- [ ] Monitorar logs de segurança regularmente

### Variáveis de Ambiente Críticas

⚠️ **NUNCA** commite o arquivo `.env` no repositório!

```env
SMTP_PASS=sua_senha_aqui  # Obrigatório
IP_HASH_SALT=string_aleatoria_unica  # Recomendado
ALLOWED_ORIGINS=https://seudominio.com  # Recomendado para produção
```

## 📊 Logs

### Arquivos de Log
- `security.log`: Log geral de requisições
- `security_events.log`: Eventos de segurança críticos

### Monitoramento
```bash
# Ver logs em tempo real
tail -f security.log

# Ver eventos de segurança
tail -f security_events.log

# Buscar IPs bloqueados
grep "blacklisted" security_events.log
```

## 🔧 Troubleshooting

### Erro: SMTP Authentication Failed
- Verifique se a senha de app está correta
- Confirme que a autenticação de 2 fatores está ativada no Gmail
- Tente gerar uma nova senha de app

### Erro: Rate Limit Exceeded
- Aguarde alguns minutos
- Verifique se não há scripts fazendo requisições excessivas

### Erro: Access Forbidden (403)
- Seu IP pode estar na blacklist
- Reinicie o servidor para limpar a blacklist temporária

## 📝 Changelog

### v4.0.0 (2025-02-16)
- ✨ Reescrita completa do backend
- 🔐 Implementação de múltiplas camadas de segurança
- 🛡️ Sistema de blacklist de IPs
- 📧 Sistema robusto de envio de e-mails
- 🔍 Logging detalhado com Request IDs
- ✅ Validação e sanitização avançadas
- 📊 Hash de IPs para privacidade
- 🚀 Headers de segurança configurados

## 👥 Desenvolvedores

Terminal 404 Team
- Email: terminallocal404@gmail.com
- Website: https://terminal404.com

## 📄 Licença

© 2025 Terminal 404 - Todos os direitos reservados.
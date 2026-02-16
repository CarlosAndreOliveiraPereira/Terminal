# 🔐 Terminal 404 - Documentação de Segurança

## Visão Geral

Este documento detalha todas as camadas de segurança implementadas no backend Python do Terminal 404.

## 📊 Resumo de Segurança

| Categoria | Status | Nível |
|-----------|--------|-------|
| Headers de Segurança | ✅ Implementado | Alto |
| Rate Limiting | ✅ Implementado | Alto |
| Input Validation | ✅ Implementado | Alto |
| IP Blacklisting | ✅ Implementado | Médio |
| Logging de Segurança | ✅ Implementado | Alto |
| CORS Protection | ✅ Implementado | Alto |
| Email Security | ✅ Implementado | Médio |
| Privacy (LGPD/GDPR) | ✅ Implementado | Alto |

## 🛡️ Camadas de Proteção

### 1. Headers de Segurança HTTP

Todos os responses incluem headers de segurança obrigatórios:

```python
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Proteção contra:**
- ✅ Clickjacking (X-Frame-Options)
- ✅ MIME sniffing attacks (X-Content-Type-Options)
- ✅ XSS attacks (X-XSS-Protection, CSP)
- ✅ Man-in-the-middle attacks (HSTS)
- ✅ Information leakage (Referrer-Policy)

### 2. Rate Limiting Avançado

**Limites Globais:**
- 100 requisições por dia
- 30 requisições por hora

**Limites Específicos:**
- `/api/send-access-log`: 3 requisições por minuto
- `/api/health`: 10 requisições por minuto

**Estratégia:** Fixed-window com headers informativos

**Proteção contra:**
- ✅ Brute force attacks
- ✅ DDoS attacks
- ✅ API abuse
- ✅ Resource exhaustion

### 3. Validação e Sanitização de Inputs

#### Validações Implementadas:

**Campo `name`:**
- Tipo: String
- Comprimento: 2-100 caracteres
- Sanitização: Remoção de HTML/scripts
- Validação: Não-vazio após trim

**Campo `message`:**
- Tipo: String
- Comprimento: 10-2000 caracteres
- Sanitização: Remoção de HTML/scripts
- Validação: Não-vazio após trim

#### Detecção de Spam:

```python
# Padrões bloqueados:
- URLs (http://, https://)
- Texto todo em maiúsculas (10+ caracteres)
- Caracteres repetidos excessivamente (10+)
```

#### Biblioteca de Sanitização:

```python
bleach.clean(
    text,
    tags=[],           # Remove todas as tags HTML
    attributes={},     # Remove todos os atributos
    strip=True         # Strip tags ao invés de escape
)
```

**Proteção contra:**
- ✅ XSS (Cross-Site Scripting)
- ✅ HTML Injection
- ✅ SQL Injection (através de sanitização)
- ✅ Command Injection
- ✅ Spam/Phishing

### 4. Sistema de Blacklist de IPs

#### Funcionamento:

1. **Rastreamento de Falhas:**
   - Cada requisição inválida incrementa contador
   - Contador expira após 1 hora
   
2. **Threshold de Bloqueio:**
   - 5 tentativas falhas = Blacklist
   - Duração: 1 hora (configurável)
   
3. **Limpeza Automática:**
   - Entradas antigas removidas automaticamente
   - Memória gerenciada eficientemente

#### Eventos que Contam como Falha:

- Validação de dados falha
- Formato JSON inválido
- Campos obrigatórios ausentes
- Padrões de spam detectados

**Proteção contra:**
- ✅ Automated attacks
- ✅ Repeated failed attempts
- ✅ Malicious bots
- ✅ Vulnerability scanning

### 5. Logging e Monitoramento

#### Arquivos de Log:

**`security.log`** - Log geral
```
2025-02-16 10:30:00 | [INFO] | IP:192.168.1.100 | Request processed
```

**`security_events.log`** - Eventos críticos
```
2025-02-16 10:30:00 | [SECURITY] | IP 192.168.1.100 blacklisted
```

#### Informações Registradas:

- ✅ Timestamp preciso
- ✅ Request ID único
- ✅ IP Hash (privacidade)
- ✅ User-Agent
- ✅ Endpoint acessado
- ✅ Status da resposta
- ✅ Erros e exceções

#### Privacy Compliance:

```python
# IPs são hasheados para LGPD/GDPR compliance
def hash_ip(ip: str) -> str:
    salt = os.getenv('IP_HASH_SALT', 'default_salt')
    return hashlib.sha256(f"{ip}{salt}".encode()).hexdigest()[:16]
```

**Conformidade:**
- ✅ LGPD (Lei Geral de Proteção de Dados)
- ✅ GDPR (General Data Protection Regulation)
- ✅ Anonimização de dados sensíveis
- ✅ Retenção limitada de dados

### 6. CORS (Cross-Origin Resource Sharing)

#### Configuração:

```python
CORS(app, resources={
    r"/api/*": {
        "origins": ALLOWED_ORIGINS,  # Configurável via .env
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "max_age": 3600
    }
})
```

#### Ambientes:

**Desenvolvimento:**
```env
ALLOWED_ORIGINS=*
```

**Produção (Recomendado):**
```env
ALLOWED_ORIGINS=https://terminal404.com,https://www.terminal404.com
```

**Proteção contra:**
- ✅ Unauthorized cross-origin requests
- ✅ CSRF attacks (com complemento de outras medidas)
- ✅ Data theft from other origins

### 7. Segurança de E-mail

#### Configurações SMTP Seguras:

```python
# TLS obrigatório
server.starttls()

# Timeout de conexão
timeout=10

# Credenciais via environment variables
SMTP_PASS = os.getenv('SMTP_PASS')
```

#### Validações de E-mail:

- ✅ Formato de e-mail validado
- ✅ Comprimento máximo (254 caracteres)
- ✅ Regex pattern matching
- ✅ Domain validation

#### Tratamento de Erros:

```python
# Erros não expõem detalhes internos ao cliente
try:
    send_email()
except SMTPAuthenticationError:
    log_error()  # Log interno
    return generic_error()  # Resposta genérica
```

**Proteção contra:**
- ✅ Email injection
- ✅ SMTP relay abuse
- ✅ Credential exposure
- ✅ Information disclosure

### 8. Request Size Limiting

```python
# Limite de 10KB por requisição
if request.content_length > 10 * 1024:
    abort(413, description="Request entity too large")
```

**Proteção contra:**
- ✅ DoS através de payloads grandes
- ✅ Memory exhaustion
- ✅ Bandwidth abuse

### 9. Request Tracking

Cada requisição recebe um ID único:

```python
request_id = secrets.token_urlsafe(32)
# Exemplo: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
```

**Benefícios:**
- ✅ Rastreamento end-to-end
- ✅ Debugging facilitado
- ✅ Correlação de logs
- ✅ Audit trail

### 10. Error Handling Seguro

#### Princípio: Fail Securely

```python
# ❌ NÃO fazer:
return jsonify({"error": str(exception)})

# ✅ FAZER:
log_detailed_error()
return jsonify({"error": "Internal server error"})
```

#### Error Codes:

| Code | Message | Detalhes Expostos |
|------|---------|-------------------|
| 400 | Bad Request | Genérico |
| 403 | Forbidden | Nenhum |
| 404 | Not Found | Nenhum |
| 413 | Request Too Large | Nenhum |
| 429 | Rate Limit Exceeded | Tempo de retry |
| 500 | Internal Server Error | Nenhum |

**Proteção contra:**
- ✅ Information disclosure
- ✅ Stack trace leakage
- ✅ System details exposure

## 🔍 Auditoria de Segurança

### Checklist de Verificação:

```bash
# 1. Verificar logs de segurança
tail -f backend/security_events.log

# 2. Analisar IPs bloqueados
grep "blacklisted" backend/security_events.log

# 3. Verificar tentativas falhas
grep "Invalid request" backend/security.log

# 4. Monitorar rate limits
grep "Rate limit exceeded" backend/security.log

# 5. Verificar erros de e-mail
grep "Email sending error" backend/security.log
```

### Métricas Recomendadas:

- Taxa de requisições bloqueadas
- Número de IPs únicos na blacklist
- Tempo médio de resposta
- Taxa de erro 5xx
- Taxa de validação falha

## 🚨 Resposta a Incidentes

### Procedimento em caso de Ataque:

1. **Identificação:**
   ```bash
   tail -100 security_events.log
   ```

2. **Análise:**
   - Verificar padrões de requisições
   - Identificar IPs maliciosos
   - Avaliar impacto

3. **Mitigação:**
   - Blacklist manual de IPs (se necessário)
   - Ajustar rate limits temporariamente
   - Atualizar regras de validação

4. **Documentação:**
   - Registrar incidente
   - Anotar ações tomadas
   - Criar relatório

5. **Prevenção:**
   - Atualizar regras de segurança
   - Melhorar validações
   - Revisar logs regularmente

## 📈 Melhorias Futuras Planejadas

### Curto Prazo:
- [ ] Implementar CAPTCHA em formulários
- [ ] Adicionar autenticação JWT
- [ ] Implementar rate limiting baseado em Redis
- [ ] Adicionar honeypot fields

### Médio Prazo:
- [ ] Integrar com WAF (Web Application Firewall)
- [ ] Implementar 2FA para admin
- [ ] Adicionar monitoramento em tempo real
- [ ] Criar dashboard de segurança

### Longo Prazo:
- [ ] Machine Learning para detecção de anomalias
- [ ] Integração com sistemas SIEM
- [ ] Penetration testing automatizado
- [ ] Compliance automation

## 📞 Contato de Segurança

Para reportar vulnerabilidades ou questões de segurança:

**Email:** terminallocal404@gmail.com  
**Assunto:** [SECURITY] Sua mensagem aqui

**Política de Divulgação Responsável:**
- Reporte vulnerabilidades diretamente à equipe
- Aguarde confirmação antes de divulgação pública
- Respeite o tempo de correção (90 dias padrão)

## 📜 Atualizações

| Data | Versão | Mudanças |
|------|--------|----------|
| 2025-02-16 | 4.0.0 | Reescrita completa com segurança avançada |

---

**© 2025 Terminal 404 - Segurança é prioridade**

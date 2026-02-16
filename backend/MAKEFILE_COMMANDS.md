# 📘 Terminal 404 - Comandos do Makefile

## 🚀 Guia Rápido de Comandos

O Makefile fornece comandos úteis para facilitar o desenvolvimento e deploy. Para ver todos os comandos disponíveis, execute:

```bash
make help
```

---

## 📋 Comandos Disponíveis

### Setup e Instalação

#### `make setup`
**Configuração inicial completa do ambiente**

O que faz:
- Cria virtual environment (se não existir)
- Ativa o venv
- Atualiza pip
- Instala todas as dependências
- Cria arquivo .env a partir do template

```bash
make setup
```

Ideal para: **Primeira vez configurando o projeto**

---

#### `make install`
**Instala apenas as dependências Python**

```bash
make install
```

Equivalente a:
```bash
pip install -r requirements.txt
```

---

### Desenvolvimento

#### `make dev`
**Inicia servidor em modo desenvolvimento**

```bash
make dev
```

Equivalente a:
```bash
python app.py
```

- Servidor: http://localhost:5000
- Debug mode: conforme configurado no .env
- Auto-reload: Sim (se FLASK_DEBUG=True)

---

#### `make prod`
**Inicia servidor em modo produção com Gunicorn**

```bash
make prod
```

Equivalente a:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 --timeout 30 --access-logfile - --error-logfile - app:app
```

Configuração:
- Workers: 4
- Port: 5000
- Timeout: 30s
- Logs: stdout/stderr

---

### Testes e Verificação

#### `make test`
**Executa suite de testes automatizada**

```bash
make test
```

Executa:
- Testes de health check
- Testes de validação
- Testes de rate limiting
- Testes de error handling

---

#### `make health`
**Verifica saúde do sistema**

```bash
make health
```

Verifica:
- ✅ Versão do Python
- ✅ Virtual environment
- ✅ Dependências instaladas
- ✅ Arquivo .env configurado
- ✅ Arquivos de log
- ✅ Porta 5000
- ✅ Permissões de arquivos
- ✅ Espaço em disco

---

#### `make check-env`
**Verifica configuração do arquivo .env**

```bash
make check-env
```

Mostra:
- Status do arquivo .env
- Variáveis configuradas
- Avisos de configuração

---

### Logs

#### `make logs`
**Mostra logs gerais em tempo real**

```bash
make logs
```

Equivalente a:
```bash
tail -f security.log
```

Pressione `Ctrl+C` para sair.

---

#### `make logs-security`
**Mostra logs de segurança em tempo real**

```bash
make logs-security
```

Equivalente a:
```bash
tail -f security_events.log
```

---

### Limpeza

#### `make clean`
**Limpa arquivos temporários e cache**

```bash
make clean
```

Remove:
- Arquivos *.pyc
- Diretórios __pycache__
- Arquivos *.log

---

#### `make clean-all`
**Limpeza completa incluindo venv**

```bash
make clean-all
```

Remove tudo que `make clean` remove, mais:
- Diretório venv/

⚠️ **Atenção**: Você precisará executar `make setup` novamente após este comando.

---

### Produção (Systemd)

#### `make status`
**Verifica status do serviço systemd**

```bash
make status
```

Equivalente a:
```bash
sudo systemctl status terminal404-backend
```

Requer: Serviço instalado no systemd

---

#### `make restart`
**Reinicia o serviço systemd**

```bash
make restart
```

Equivalente a:
```bash
sudo systemctl restart terminal404-backend
```

---

### Utilitários

#### `make deploy`
**Prepara sistema para deploy**

```bash
make deploy
```

Executa:
1. `make setup` - Configuração completa
2. `make test` - Testes automatizados

Se tudo passar, o sistema está pronto para produção!

---

## 🔄 Fluxos de Trabalho Comuns

### Primeira Configuração

```bash
# 1. Setup inicial
make setup

# 2. Editar .env com suas credenciais
nano .env

# 3. Verificar sistema
make health

# 4. Executar testes
make test

# 5. Iniciar desenvolvimento
make dev
```

---

### Desenvolvimento Diário

```bash
# 1. Ativar venv (se não estiver ativado)
source venv/bin/activate

# 2. Iniciar servidor
make dev

# 3. Em outro terminal, ver logs
make logs
```

---

### Deploy para Produção

```bash
# 1. Preparar e testar
make deploy

# 2. Iniciar em produção
make prod

# 3. Ou configurar systemd (uma vez)
# Copiar e configurar service file
# sudo cp systemd.service.example /etc/systemd/system/terminal404-backend.service
# sudo systemctl enable terminal404-backend
# sudo systemctl start terminal404-backend

# 4. Gerenciar com systemd
make status
make restart
```

---

### Debugging

```bash
# 1. Verificar configuração
make check-env

# 2. Verificar saúde do sistema
make health

# 3. Ver logs em tempo real
make logs

# 4. Ver logs de segurança
make logs-security

# 5. Executar testes
make test
```

---

### Manutenção

```bash
# 1. Limpar arquivos temporários
make clean

# 2. Reinstalar dependências (se necessário)
make install

# 3. Executar testes
make test
```

---

## 💡 Dicas

### Combinar Comandos

```bash
# Limpar e configurar do zero
make clean-all && make setup

# Setup, testar e iniciar
make setup && make test && make dev

# Limpar logs e iniciar
make clean && make dev
```

### Verificar Antes de Deploy

```bash
# Checklist completo
make health && make check-env && make test
```

### Monitoramento Contínuo

```bash
# Terminal 1: Servidor
make prod

# Terminal 2: Logs gerais
make logs

# Terminal 3: Logs de segurança
make logs-security
```

---

## 🚨 Troubleshooting

### Comando não encontrado

```bash
# Instalar make (Ubuntu/Debian)
sudo apt install make

# Instalar make (macOS)
brew install make
```

### Erro de permissão

```bash
# Dar permissão de execução ao Makefile
chmod +x Makefile
```

### make setup falha

```bash
# Verificar Python
python3 --version

# Deve ser 3.8 ou superior
# Instalar Python se necessário
```

---

## 📚 Recursos Adicionais

- **README.md**: Documentação completa
- **SECURITY.md**: Detalhes de segurança
- **DEPLOY_PRODUCTION.md**: Guia de deploy em produção
- **QUICKSTART.md**: Guia rápido de início

---

## ❓ Precisa de Ajuda?

```bash
# Ver todos os comandos
make help

# Ver este guia
cat MAKEFILE_COMMANDS.md

# Contato
# Email: terminallocal404@gmail.com
```

---

**Terminal 404** - Desenvolvimento web de alta performance com estética cyberpunk

# Terminal 404 Backend - Makefile
# Comandos úteis para desenvolvimento e deploy

.PHONY: help install setup dev prod test health logs clean

# Cores para output
RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[1;33m
NC=\033[0m # No Color

help: ## Mostra esta mensagem de ajuda
	@echo "$(GREEN)Terminal 404 Backend - Comandos Disponíveis$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

install: ## Instala dependências Python
	@echo "$(GREEN)Instalando dependências...$(NC)"
	pip install -r requirements.txt
	@echo "$(GREEN)✓ Dependências instaladas$(NC)"

setup: ## Configuração inicial completa
	@echo "$(GREEN)Iniciando configuração...$(NC)"
	@if [ ! -d "venv" ]; then \
		echo "$(YELLOW)Criando virtual environment...$(NC)"; \
		python3 -m venv venv; \
	fi
	@echo "$(YELLOW)Ativando venv e instalando dependências...$(NC)"
	@bash -c "source venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt"
	@if [ ! -f ".env" ]; then \
		echo "$(YELLOW)Criando arquivo .env...$(NC)"; \
		cp .env.example .env; \
		echo "$(YELLOW)⚠️  Configure suas credenciais no arquivo .env$(NC)"; \
	fi
	@echo "$(GREEN)✓ Configuração completa!$(NC)"
	@echo "$(YELLOW)Execute 'make health' para verificar o sistema$(NC)"

dev: ## Inicia servidor em modo desenvolvimento
	@echo "$(GREEN)Iniciando servidor em modo desenvolvimento...$(NC)"
	python app.py

prod: ## Inicia servidor em modo produção (Gunicorn)
	@echo "$(GREEN)Iniciando servidor em modo produção...$(NC)"
	gunicorn -w 4 -b 0.0.0.0:5000 --timeout 30 --access-logfile - --error-logfile - app:app

test: ## Executa testes da API
	@echo "$(GREEN)Executando testes...$(NC)"
	python test_api.py

health: ## Verifica saúde do sistema
	@echo "$(GREEN)Verificando saúde do sistema...$(NC)"
	python healthcheck.py

logs: ## Mostra logs em tempo real
	@echo "$(GREEN)Logs do sistema (Ctrl+C para sair)$(NC)"
	@if [ -f "security.log" ]; then \
		tail -f security.log; \
	else \
		echo "$(RED)Arquivo security.log não encontrado$(NC)"; \
	fi

logs-security: ## Mostra logs de segurança em tempo real
	@echo "$(GREEN)Logs de segurança (Ctrl+C para sair)$(NC)"
	@if [ -f "security_events.log" ]; then \
		tail -f security_events.log; \
	else \
		echo "$(RED)Arquivo security_events.log não encontrado$(NC)"; \
	fi

clean: ## Limpa arquivos temporários e cache
	@echo "$(YELLOW)Limpando arquivos temporários...$(NC)"
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete
	find . -type f -name '*.log' -delete
	@echo "$(GREEN)✓ Limpeza concluída$(NC)"

clean-all: clean ## Limpa tudo incluindo venv
	@echo "$(YELLOW)Removendo virtual environment...$(NC)"
	rm -rf venv
	@echo "$(GREEN)✓ Limpeza completa$(NC)"

restart: ## Reinicia o serviço systemd (produção)
	@echo "$(GREEN)Reiniciando serviço...$(NC)"
	sudo systemctl restart terminal404-backend
	@echo "$(GREEN)✓ Serviço reiniciado$(NC)"

status: ## Verifica status do serviço systemd (produção)
	@echo "$(GREEN)Status do serviço:$(NC)"
	sudo systemctl status terminal404-backend

check-env: ## Verifica configuração do .env
	@echo "$(GREEN)Verificando configuração...$(NC)"
	@if [ -f ".env" ]; then \
		echo "$(GREEN)✓ Arquivo .env encontrado$(NC)"; \
		@python3 -c "import os; from dotenv import load_dotenv; load_dotenv(); \
		print('SMTP_USER:', os.getenv('SMTP_USER')); \
		print('SMTP_PASS:', '✓ Configurado' if os.getenv('SMTP_PASS') else '✗ Não configurado'); \
		print('FLASK_DEBUG:', os.getenv('FLASK_DEBUG', 'False'))"; \
	else \
		echo "$(RED)✗ Arquivo .env não encontrado$(NC)"; \
	fi

deploy: setup test ## Prepara para deploy (setup + testes)
	@echo "$(GREEN)✓ Sistema pronto para deploy!$(NC)"
	@echo "$(YELLOW)Execute 'make prod' para iniciar em produção$(NC)"

# Default target
.DEFAULT_GOAL := help

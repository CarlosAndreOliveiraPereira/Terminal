# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o Terminal 404! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Código de Conduta

- Seja respeitoso e profissional
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Demonstre empatia com outros membros

## 🚀 Como Contribuir

### Reportar Bugs

1. **Verifique** se o bug já foi reportado nas [Issues](https://github.com/seu-usuario/terminal-404/issues)
2. **Crie uma nova issue** com:
   - Título claro e descritivo
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Informações do ambiente (OS, browser, versão)

### Sugerir Melhorias

1. **Abra uma issue** com a tag `enhancement`
2. **Descreva** a melhoria proposta
3. **Explique** por que seria útil
4. **Forneça** exemplos de uso

### Pull Requests

1. **Fork** o repositório
2. **Crie** uma branch para sua feature:
   ```bash
   git checkout -b feature/minha-feature
   ```
3. **Faça** suas alterações
4. **Teste** suas mudanças
5. **Commit** com mensagens claras:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade X"
   ```
6. **Push** para sua branch:
   ```bash
   git push origin feature/minha-feature
   ```
7. **Abra** um Pull Request

## 📝 Padrões de Código

### Frontend (TypeScript/React)

```typescript
// ✅ BOM
export function ComponenteName({ prop1, prop2 }: Props) {
  const [state, setState] = useState<Type>(initialValue);
  
  return (
    <div className="flex items-center gap-4">
      {/* Conteúdo */}
    </div>
  );
}

// ❌ RUIM
function componentename(props) {
  return <div>{props.value}</div>
}
```

**Regras:**
- Use TypeScript
- Componentes funcionais com hooks
- Props tipadas com interfaces
- Tailwind CSS para estilização
- Nomes descritivos de variáveis

### Backend (Python)

```python
# ✅ BOM
def process_user_data(data: Dict[str, Any]) -> tuple:
    """
    Process and validate user data.
    
    Args:
        data: Dictionary containing user information
        
    Returns:
        Tuple of (is_valid, error_message, processed_data)
    """
    # Implementation
    pass

# ❌ RUIM
def proc(d):
    return d
```

**Regras:**
- Siga PEP 8
- Type hints sempre que possível
- Docstrings para funções públicas
- Nomes descritivos
- Validação de inputs

### Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição curta

Descrição mais detalhada (opcional)
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alteração em documentação
- `style`: Mudanças de formatação
- `refactor`: Refatoração de código
- `test`: Adição/modificação de testes
- `chore`: Manutenção geral

**Exemplos:**
```
feat(backend): adiciona validação de CPF
fix(frontend): corrige bug no menu mobile
docs(readme): atualiza instruções de instalação
style(components): ajusta formatação do Header
refactor(api): simplifica lógica de autenticação
test(backend): adiciona testes para SecurityValidator
chore(deps): atualiza dependências
```

## 🧪 Testes

### Frontend

```bash
# Executar testes (quando implementados)
npm test

# Lint
npm run lint
```

### Backend

```bash
# Testes automatizados
cd backend
python test_api.py

# Verificar código
pylint app.py
```

## 📚 Documentação

Ao adicionar novas funcionalidades:

1. **Atualize** o README.md se necessário
2. **Documente** novas APIs/endpoints
3. **Adicione** comentários em código complexo
4. **Atualize** o CHANGELOG.md

## 🔒 Segurança

**NUNCA** comite:
- Senhas ou tokens
- Arquivos `.env`
- Chaves de API
- Dados sensíveis

Se encontrar vulnerabilidade de segurança:
1. **NÃO** abra issue pública
2. **Envie** e-mail para: terminallocal404@gmail.com
3. **Aguarde** resposta antes de divulgar

## ✅ Checklist do Pull Request

Antes de submeter seu PR, verifique:

- [ ] Código segue os padrões do projeto
- [ ] Testes passam (se aplicável)
- [ ] Documentação atualizada
- [ ] Commits seguem padrão Conventional
- [ ] Sem arquivos desnecessários
- [ ] Sem credenciais no código
- [ ] Branch está atualizada com main
- [ ] Descrição clara do PR

## 🎯 Áreas para Contribuir

### Frontend
- Melhorias de UX/UI
- Animações cyberpunk
- Responsividade
- Acessibilidade (a11y)
- Performance

### Backend
- Novos endpoints
- Otimizações
- Testes unitários
- Documentação de API
- Segurança

### Documentação
- Tutoriais
- Exemplos de uso
- Tradução
- Correções
- Diagramas

### DevOps
- Scripts de deploy
- CI/CD
- Docker
- Monitoramento
- Backup

## 💬 Dúvidas?

- Abra uma [Discussion](https://github.com/seu-usuario/terminal-404/discussions)
- Entre em contato: terminallocal404@gmail.com
- Consulte a documentação no README.md

---

**Obrigado por contribuir com o Terminal 404! 🚀**

Cada contribuição, por menor que seja, faz diferença. Juntos criamos algo incrível! ⚡

---

**Terminal 404** - Desenvolvimento web de alta performance com estética cyberpunk

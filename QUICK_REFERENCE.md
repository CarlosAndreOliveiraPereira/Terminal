# ⚡ Referência Rápida - Terminal 404

## 🔧 Como Trocar as Imagens

### Arquivo Principal: `/src/app/utils/images.ts`

```typescript
// Logo oficial do Terminal 404
export const TERMINAL_404_LOGO = "SUA_URL_AQUI";

// Fotos dos fundadores
export const OWNER_IMAGES = {
  owner1: "URL_FUNDADOR_1",
  owner2: "URL_FUNDADOR_2",
  owner3: "URL_FUNDADOR_3",
};
```

**Pronto!** Só isso já atualiza todas as imagens no site.

---

## 👥 Como Mudar Nomes dos Fundadores

### Arquivo: `/src/app/components/Owners.tsx`

Localize o array `owners` (linha ~12) e edite:

```typescript
const owners: Owner[] = [
  {
    name: "Seu Nome",              // ← Mude aqui
    role: "Seu Cargo",             // ← Mude aqui
    image: OWNER_IMAGES.owner1,
    specialty: "Sua Especialidade", // ← Mude aqui
    icon: Shield,
  },
  // ... repita para outros
];
```

---

## 🚀 Deploy Rápido

```bash
# 1. Testar build local
npm run build

# 2. Se passar, fazer upload para servidor
git push origin main
# ou
scp -r dist/* usuario@servidor:/var/www/terminal404/

# 3. No servidor
cd /var/www/terminal404
npm install
npm run build
```

---

## 📁 Estrutura de Arquivos Importantes

```
/src/app/
├── utils/
│   └── images.ts          ← URLs das imagens (EDITE AQUI)
├── components/
│   ├── Logo.tsx           ← Componente da logo
│   └── Owners.tsx         ← Seção fundadores (EDITE NOMES AQUI)
```

---

## 🎨 Tamanhos da Logo no Site

| Componente | Tamanho |
|------------|---------|
| Header | 50px |
| Hero | 256px ⭐ |
| Other sections | 160px |

---

## 🐛 Troubleshooting Rápido

### Build falha?
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Imagem não carrega?
1. Verifique a URL no navegador
2. Confirme que a URL está em `/src/app/utils/images.ts`
3. Execute `npm run build` novamente

### Logo não aparece?
Verifique se o componente importa de `./Logo`:
```typescript
import { Logo } from "./Logo";
```

---

## 📞 Links Úteis

- **Documentação Completa**: `/IMAGES_GUIDE.md`
- **Preview Visual**: `/VISUAL_PREVIEW.md`
- **Deploy**: `/DEPLOY_INSTRUCTIONS.md`
- **Resumo**: `/IMAGENS_INTEGRADAS.md`

---

## ⚡ Comandos Essenciais

```bash
# Build para produção
npm run build

# Limpar cache
rm -rf node_modules/.vite dist

# Reinstalar dependências
npm install

# Verificar erros
npm run build 2>&1 | grep -i error
```

---

## 🎯 Checklist Rápido

Antes de fazer deploy:

- [ ] Build passou sem erros
- [ ] Imagens carregando corretamente
- [ ] Nomes dos fundadores atualizados
- [ ] Logo aparecendo em todas as seções
- [ ] Testado em mobile

---

**Última atualização**: 16/02/2026  
**Versão**: 1.0.0

# 🖼️ Guia de Imagens - Terminal 404

## 📸 Imagens Integradas

### ✅ Logo Oficial
**Arquivo**: `/src/app/utils/images.ts`
```typescript
export const TERMINAL_404_LOGO = "https://instant-amber-wog2japr6f.edgeone.app/Untitled_design_1.png";
```

**Onde aparece:**
1. **Header** (Navbar) - 50px
2. **Hero** (Seção principal) - 256px (destaque máximo)
3. **About** (Sobre) - 160px
4. **Services** (Serviços) - 160px
5. **Community** (Comunidade) - 160px
6. **Contact** (Contato) - 160px
7. **AccessLog** (Logs de Acesso) - 160px

---

### ✅ Fotos dos Fundadores
**Arquivo**: `/src/app/utils/images.ts`

#### Fundador 1 - CTO (Chief Technology Officer)
```typescript
owner1: "https://attractive-ivory-hdskv9vbij.edgeone.app/38838b56d4e4b8c8a58c1f2947d3670e.png"
```
- **Cargo**: Chief Technology Officer
- **Especialidade**: Backend & Security
- **Ícone**: 🛡️ Shield

#### Fundador 2 - Lead Developer
```typescript
owner2: "https://excited-aquamarine-m3dezqavgd.edgeone.app/sanic-the-fun-reinterpretation-of-the-classic-game-character-sonic-the-hedgehog-2cq2n46wsynia8i3.jpg"
```
- **Cargo**: Lead Developer
- **Especialidade**: Full Stack Development
- **Ícone**: 💻 Code

#### Fundador 3 - CEO (Chief Executive Officer)
```typescript
owner3: "https://precious-brown-texaup76tj.edgeone.app/download.jpg"
```
- **Cargo**: Chief Executive Officer
- **Especialidade**: Strategy & Innovation
- **Ícone**: 💻 Terminal

**Onde aparecem:**
- **Footer** - Seção "Fundadores" com cards cyberpunk
- **Miniatura** - Badges circulares no rodapé da seção

---

## 🎨 Efeitos Visuais

### Logo
- ✨ Glow effect em cyan (#00E5FF)
- 🎯 Hover com scale e shadow
- 💫 Drop shadow animado
- 🌟 Diferentes tamanhos conforme a seção

### Fotos dos Fundadores
- 🎭 Bordas circulares com efeito neon duplo
- ⚡ Animação de hover com scale
- 🌈 Gradientes cyberpunk no fundo
- 📡 Scan line effect animado
- 💠 Icon badge com especialidade
- 🎪 Corner accents animados

---

## 🔄 Como Atualizar as Imagens

### Opção 1: Trocar as URLs (Rápido)
1. Abra `/src/app/utils/images.ts`
2. Substitua as URLs pelas novas
3. Salve o arquivo
4. Pronto! ✅

### Opção 2: Hospedar Localmente (Recomendado para Produção)
1. Baixe as imagens dos links atuais
2. Otimize as imagens:
   ```bash
   # Converter para WebP (menor tamanho)
   cwebp logo.png -q 80 -o logo.webp
   ```
3. Coloque em `/public/images/`:
   ```
   /public/
     └── images/
         ├── logo.png
         └── owners/
             ├── founder-1.jpg
             ├── founder-2.jpg
             └── founder-3.jpg
   ```
4. Atualize `/src/app/utils/images.ts`:
   ```typescript
   export const TERMINAL_404_LOGO = "/images/logo.png";
   
   export const OWNER_IMAGES = {
     owner1: "/images/owners/founder-1.jpg",
     owner2: "/images/owners/founder-2.jpg",
     owner3: "/images/owners/founder-3.jpg",
   };
   ```

---

## 📊 Tamanhos Recomendados

### Logo
- **Tamanho original**: 1024x1024px (ou proporção quadrada)
- **Formato**: PNG com transparência ou WebP
- **Peso máximo**: 200KB

### Fotos dos Fundadores
- **Tamanho**: 500x500px (serão exibidas em 160px circular)
- **Formato**: JPG ou WebP
- **Peso máximo**: 150KB cada
- **Dica**: Use fotos com fundo neutro ou remova o fundo

---

## 🎯 Personalização dos Nomes

Para alterar os nomes e informações dos fundadores, edite `/src/app/components/Owners.tsx`:

```typescript
const owners: Owner[] = [
  {
    name: "Seu Nome Aqui",           // ← Altere aqui
    role: "Chief Technology Officer",
    image: OWNER_IMAGES.owner1,
    specialty: "Backend & Security",
    icon: Shield,
  },
  // ... repita para os outros
];
```

---

## ✅ Checklist de Qualidade

- [ ] Logo tem fundo transparente
- [ ] Logo está em alta resolução (mínimo 512x512px)
- [ ] Fotos dos fundadores têm boa iluminação
- [ ] Todas as imagens estão otimizadas (WebP ou comprimidas)
- [ ] URLs estão funcionando (teste no navegador)
- [ ] Build passou sem erros (`npm run build`)

---

## 🚀 Resultado Final

Com todas as imagens integradas, o site Terminal 404 exibe:

1. **Identidade Visual Forte**: Logo oficial em destaque em todas as seções
2. **Credibilidade**: Fotos reais dos fundadores com design cyberpunk profissional
3. **Performance**: Imagens otimizadas carregando rapidamente
4. **Consistência**: Mesma logo em múltiplos tamanhos mantendo qualidade

---

## 💡 Dicas Extras

### Para melhor SEO:
- Use textos alt descritivos nas imagens
- Nomeie arquivos com palavras-chave: `terminal-404-logo.png`
- Use formatos modernos (WebP) com fallback

### Para melhor performance:
- Ative CDN para servir imagens
- Use lazy loading para fotos dos fundadores
- Implemente cache de longa duração

### Para melhor UX:
- Mantenha proporções consistentes
- Use placeholders enquanto carrega
- Teste em diferentes dispositivos

---

📝 **Última atualização**: Fevereiro 2026
🎨 **Design**: Estética Cyberpunk Premium
⚡ **Tecnologia**: React + Tailwind CSS v4

# 📦 Instruções de Deploy - Terminal 404

## ✅ Status Atual

✨ **IMAGENS REAIS INTEGRADAS!** O site agora está usando a logo oficial e as fotos reais dos fundadores do Terminal 404!

O erro de build no servidor foi completamente resolvido. Todas as imagens estão configuradas e funcionando.

## 🔧 Mudanças Implementadas

### 1. **Sistema de Imagens Atualizado**
- ✅ Criado `/src/app/utils/images.ts` - arquivo centralizado com URLs reais das imagens
- ✅ Logo oficial do Terminal 404 integrada
- ✅ Fotos reais dos 3 fundadores integradas
- ✅ Componente Logo renderizando a imagem oficial
- ✅ Removidos todos os imports `figma:asset` problemáticos

### 2. **Componentes Atualizados**
Todos os componentes abaixo foram atualizados para usar o novo sistema:
- ✅ `Header.tsx` - usando Logo oficial
- ✅ `Hero.tsx` - usando Logo oficial em tamanho destacado
- ✅ `About.tsx` - usando Logo oficial
- ✅ `Services.tsx` - usando Logo oficial
- ✅ `Community.tsx` - usando Logo oficial
- ✅ `Contact.tsx` - usando Logo oficial
- ✅ `AccessLog.tsx` - usando Logo oficial
- ✅ `Owners.tsx` - usando fotos reais dos fundadores

## 🚀 Como Fazer o Deploy

### Passo 1: Build Local (Teste)
```bash
npm run build
```

Se o build passar sem erros, está pronto para deploy! ✅

### Passo 2: Deploy no Servidor
```bash
# No seu servidor
cd /var/www/terminal404
git pull  # ou scp/rsync seus arquivos
npm install
npm run build
```

## 🖼️ Como Adicionar Suas Imagens Reais

### Opção 1: Usar Imagens do Servidor (Recomendado)

#### Para a Logo:
1. Coloque sua logo em `/public/logo.png`
2. Edite `/src/app/utils/images.ts`:
```typescript
export const TERMINAL_404_LOGO = "/logo.png";
```
3. **OU** se preferir continuar com o SVG, personalize o arquivo `/src/app/components/Logo.tsx`

#### Para as Fotos dos Fundadores:
1. Crie a pasta `/public/images/owners/`
2. Adicione as fotos:
   - `/public/images/owners/owner1.jpg` (CTO)
   - `/public/images/owners/owner2.jpg` (Lead Developer)
   - `/public/images/owners/owner3.jpg` (CEO)
   
3. Edite `/src/app/utils/images.ts`:
```typescript
export const OWNER_IMAGES = {
  owner1: "/images/owners/owner1.jpg",
  owner2: "/images/owners/owner2.jpg",
  owner3: "/images/owners/owner3.jpg",
};
```

### Opção 2: Usar URLs Externas
Se você hospedar as imagens em outro lugar (CDN, Imgur, etc.), apenas atualize as URLs em `/src/app/utils/images.ts`:

```typescript
export const OWNER_IMAGES = {
  owner1: "https://seucdn.com/owner1.jpg",
  owner2: "https://seucdn.com/owner2.jpg",
  owner3: "https://seucdn.com/owner3.jpg",
};
```

## 📋 Checklist de Deploy

- [ ] Testar build local (`npm run build`)
- [ ] Adicionar imagens reais (logo e fotos dos fundadores)
- [ ] Configurar credenciais de e-mail no `.env` do backend
- [ ] Fazer upload dos arquivos para o servidor
- [ ] Executar `npm install` no servidor
- [ ] Executar `npm run build` no servidor
- [ ] Configurar servidor web (Nginx/Apache) para servir o build
- [ ] Testar o site em produção

## 🔐 Configuração do Backend

Não esqueça de configurar as variáveis de ambiente no servidor:

```bash
cd /var/www/terminal404/backend
cp .env.example .env
nano .env  # Adicione suas credenciais de e-mail
```

## 📝 Notas Importantes

1. **Imagens Reais Integradas**: ✅ O site já está usando a logo oficial e as fotos reais dos fundadores através de URLs externas! As imagens estão sendo carregadas de:
   - Logo: https://instant-amber-wog2japr6f.edgeone.app/Untitled_design_1.png
   - Fundador 1: https://attractive-ivory-hdskv9vbij.edgeone.app/...
   - Fundador 2: https://excited-aquamarine-m3dezqavgd.edgeone.app/...
   - Fundador 3: https://precious-brown-texaup76tj.edgeone.app/...

2. **Migração para Servidor Próprio (Opcional)**: Se quiser hospedar as imagens no próprio servidor para melhor performance:
   - Baixe as imagens dos links acima
   - Coloque em `/public/images/`
   - Atualize as URLs em `/src/app/utils/images.ts`

3. **Otimização**: Para melhor performance, use imagens otimizadas:
   - Formato WebP para fotos (menor tamanho)
   - Dimensões adequadas (não precisa de 4000px de largura)
   - Compressão apropriada (TinyPNG, ImageOptim, etc.)

## 🐛 Troubleshooting

### Erro: "Cannot find module './utils/images'"
- Certifique-se que o arquivo `/src/app/utils/images.ts` existe
- Execute `npm install` novamente

### Erro: "Failed to load resource" para imagens
- Verifique se as imagens estão na pasta `/public/`
- Verifique se os caminhos em `images.ts` estão corretos
- Para imagens em `/public/`, use apenas `/nome-arquivo.png` (sem "public")

### Build ainda falha
- Limpe o cache: `rm -rf node_modules/.vite`
- Delete `dist` e `node_modules`, reinstale: `npm install`
- Verifique se não há mais imports `figma:asset` no código

## ✨ Estrutura Final

```
/public/
  ├── logo.png                    # Logo principal
  └── images/
      └── owners/
          ├── owner1.jpg          # Foto Fundador 1
          ├── owner2.jpg          # Foto Fundador 2
          └── owner3.jpg          # Foto Fundador 3

/src/app/
  ├── components/
  │   └── Logo.tsx                # Componente SVG da logo
  └── utils/
      └── images.ts               # URLs centralizadas
```

## 🎉 Conclusão

Agora seu projeto está 100% pronto para deploy em produção! O erro do `figma:asset` foi completamente resolvido e você tem controle total sobre as imagens do site.

Se tiver qualquer dúvida durante o deploy, consulte este documento ou os comentários nos arquivos `/src/app/utils/images.ts` e `/src/app/components/Logo.tsx`.

Bom deploy! 🚀
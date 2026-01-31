
# Plano: Substituir Vídeo do VSL

## Objetivo
Substituir o vídeo do YouTube que aparece abaixo do texto "Conquiste Seus Objetivos Financeiros Com O Poder Da Organização E Planejamento Inteligente." pelo novo vídeo.

## Alteração

**Arquivo:** `src/pages/LandingPage.tsx`

**Vídeo atual:** `TlnrQnk4M_E`
**Novo vídeo:** `8n4ex3L5G8E`

### Locais a serem alterados:

1. **Linha 370** - Thumbnail da imagem:
   - De: `https://img.youtube.com/vi/TlnrQnk4M_E/maxresdefault.jpg`
   - Para: `https://img.youtube.com/vi/8n4ex3L5G8E/maxresdefault.jpg`

2. **Linha 403** - URL do embed no modal:
   - De: `https://www.youtube.com/embed/TlnrQnk4M_E?rel=0&modestbranding=1&autoplay=1`
   - Para: `https://www.youtube.com/embed/8n4ex3L5G8E?rel=0&modestbranding=1&autoplay=1`

## O que NÃO será alterado
- Tamanho do vídeo (mobile e desktop)
- Proporção do vídeo (9:16 no mobile, 16:9 no desktop)
- Botão de play vermelho
- Texto "Clique para assistir"
- Modal com botão de fechar
- Parâmetros do YouTube (autoplay, modestbranding, rel)
- Qualquer outra configuração existente

## Resultado
O novo vídeo será exibido mantendo exatamente a mesma aparência e comportamento em todos os dispositivos.

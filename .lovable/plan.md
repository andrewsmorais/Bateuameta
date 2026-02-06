
# Plano: Atualizar Link do Tutorial "Como Usar"

## Objetivo
Atualizar o link do vídeo tutorial "Como Usar" em dois lugares para usar o formato completo do YouTube.

## Alterações

### 1. Arquivo: `src/pages/Configuracoes.tsx`

**Linha ~212 - Atualizar href:**
- De: `https://youtu.be/u2kpNJZX5Y8`
- Para: `https://www.youtube.com/watch?v=u2kpNJZX5Y8`

### 2. Arquivo: `src/pages/Obrigado.tsx`

**Linha ~97 - Atualizar href do botão "Assistir Tutorial":**
- De: `https://youtu.be/u2kpNJZX5Y8`
- Para: `https://www.youtube.com/watch?v=u2kpNJZX5Y8`

## Observação
Ambos os links apontam para o mesmo vídeo (ID: u2kpNJZX5Y8). A diferença é apenas o formato da URL:
- `youtu.be/` = formato curto de compartilhamento
- `youtube.com/watch?v=` = formato completo padrão

## Resultado
Ao clicar em "Como Usar" em qualquer uma das duas páginas, o usuário será direcionado para o vídeo tutorial usando o formato de URL completo do YouTube.

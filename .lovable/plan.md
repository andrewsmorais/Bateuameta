
# Plano: Substituir Link do Vídeo Tutorial

## Objetivo
Substituir o link do vídeo tutorial na página "Obrigado" no card "Como Usar".

## Alteração

**Arquivo:** `src/pages/Obrigado.tsx`

**Link atual:** `https://youtu.be/sbWG4v0Rm8I`
**Novo link:** `https://youtu.be/u2kpNJZX5Y8`

### Local a ser alterado:

**Linha 111** - URL do botão "Assistir Tutorial":
- De: `https://youtu.be/sbWG4v0Rm8I`
- Para: `https://youtu.be/u2kpNJZX5Y8`

## O que NÃO será alterado
- Texto do título "Como Usar"
- Texto descritivo "Preparei um vídeo rápido para você aprender a configurar tudo em 2 minutos."
- Estilo do botão "Assistir Tutorial" (vermelho com ícone de play)
- Comportamento de abrir em nova aba
- Qualquer outro elemento da página

## Resultado
O botão "Assistir Tutorial" abrirá o novo vídeo ao ser clicado.

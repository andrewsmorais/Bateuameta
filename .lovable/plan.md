

# Plano: Empilhar Vídeos do YouTube Shorts Verticalmente

## Objetivo
Alterar o layout dos 4 vídeos do YouTube Shorts para que fiquem empilhados um debaixo do outro (verticalmente), removendo o formato de carrossel.

## Layout Atual vs. Proposto

```text
ATUAL:                              PROPOSTO:
+------+ +------+ +------+ +------+        +------+
|Video1| |Video2| |Video3| |Video4|        |Video1|
+------+ +------+ +------+ +------+        +------+
   (Grid horizontal no desktop)              |
                                           +------+
   [< ] [Video] [ >]                       |Video2|
   (Carrossel no mobile)                   +------+
                                             |
                                           +------+
                                           |Video3|
                                           +------+
                                             |
                                           +------+
                                           |Video4|
                                           +------+
                                      (Empilhados verticalmente)
```

## Implementação

### Arquivo: `src/pages/LandingPage.tsx`

**Alteração:** Substituir o código atual (linhas 757-802) por uma estrutura simples de flex vertical:

1. **Remover** o grid de 4 colunas do desktop
2. **Remover** o componente Carousel do mobile
3. **Adicionar** layout flex vertical com espaçamento entre vídeos
4. **Centralizar** cada vídeo com largura máxima apropriada para formato 9:16

### Detalhes Técnicos
- Usar `flex flex-col` para empilhar verticalmente
- Usar `gap-6` para espaçamento entre vídeos
- Usar `max-w-xs` (320px) para tamanho adequado no mobile
- Usar `md:max-w-sm` (384px) para tamanho maior no desktop
- Manter `aspect-[9/16]` para proporção vertical
- Manter bordas arredondadas e sombra

## Resultado Esperado
Os 4 vídeos aparecerão empilhados verticalmente (um abaixo do outro), centralizados na página, com tamanho apropriado para o formato Shorts, tanto no mobile quanto no desktop.


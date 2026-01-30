
# Plano: Adicionar Videos do YouTube Shorts na Seção de Depoimentos

## Objetivo
Adicionar 4 vídeos do YouTube Shorts (proporção 9:16) abaixo do título "Veja Quem Já Bateu A Meta!" na seção de depoimentos da Landing Page.

## Vídeos a Adicionar
1. https://youtube.com/shorts/bOkwngfR0-8
2. https://youtube.com/shorts/9e7MrKaUW5c
3. https://youtube.com/shorts/RTqU92TMKfU
4. https://youtube.com/shorts/rR8iYDF_8YY

## Layout Proposto

```text
+------------------------------------------+
|     Título da Seção (existente)          |
+------------------------------------------+
|                                          |
|  +------+  +------+  +------+  +------+  |
|  | Video|  | Video|  | Video|  | Video|  |
|  | 9:16 |  | 9:16 |  | 9:16 |  | 9:16 |  |
|  +------+  +------+  +------+  +------+  |
|                                          |
|  (Mobile: Carrossel horizontal)          |
|                                          |
+------------------------------------------+
|     Carrossel de Depoimentos (existente) |
+------------------------------------------+
```

## Implementação Técnica

### Arquivo: `src/pages/LandingPage.tsx`

1. **Criar array com os IDs dos vídeos Shorts**
   - Extrair os IDs: `bOkwngfR0-8`, `9e7MrKaUW5c`, `RTqU92TMKfU`, `rR8iYDF_8YY`

2. **Adicionar novo componente de carrossel de vídeos**
   - Posicionar entre o título (linha 755) e o carrossel de depoimentos (linha 758)
   - Usar componente `Carousel` já existente para consistência

3. **Layout Responsivo**
   - **Mobile**: Carrossel horizontal com 1 vídeo por vez
   - **Desktop**: Grid com 4 vídeos lado a lado

4. **Estilo dos Vídeos**
   - Usar `aspect-[9/16]` para manter proporção vertical
   - Embed do YouTube com parâmetros otimizados
   - Bordas arredondadas e sombra para consistência visual

### Código do Embed
Cada vídeo será um iframe com:
- Proporção 9:16 (vertical, formato Shorts)
- Parâmetros: `rel=0`, `modestbranding=1`
- Responsivo com tamanho adequado para mobile e desktop

## Resultado Esperado
Os 4 vídeos aparecerão em formato vertical (9:16) logo abaixo do título da seção de depoimentos, antes dos cards de depoimentos existentes. No mobile, serão exibidos em carrossel deslizante. No desktop, em linha horizontal.

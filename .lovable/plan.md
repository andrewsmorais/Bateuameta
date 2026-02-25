

## Problema
O vídeo do YouTube Shorts com ID `rR8iYDF_8YY` está dando erro ("Something went wrong") na seção de depoimentos da Landing Page. Isso pode acontecer porque o vídeo foi removido, tornado privado, ou está com restrição de embed.

## Diagnóstico
O vídeo está embedado na seção "Veja Quem Já Bateu A Meta!" junto com outros 4 vídeos Shorts. O embed usa a URL padrão `https://www.youtube.com/embed/rR8iYDF_8YY`.

## Solução
Remover o vídeo `rR8iYDF_8YY` da lista de depoimentos, já que ele não está mais disponível no YouTube.

### Arquivo: `src/pages/LandingPage.tsx` (linha 760)

**Antes:**
```js
{['bOkwngfR0-8', '9e7MrKaUW5c', 'RTqU92TMKfU', 'rR8iYDF_8YY', 'T85VaIC987M'].map(...)
```

**Depois:**
```js
{['bOkwngfR0-8', '9e7MrKaUW5c', 'RTqU92TMKfU', 'T85VaIC987M'].map(...)
```

Isso reduz de 5 para 4 vídeos, que se encaixam perfeitamente no grid de 4 colunas do desktop sem precisar ajustar o layout.

> **Nota:** Se você tiver outro vídeo de depoimento para substituir o removido, me avise o link e eu coloco no lugar.


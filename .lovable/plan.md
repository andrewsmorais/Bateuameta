

## Adicionar Tag do Google Ads

### Como funciona
Assim como o Facebook Pixel que já está no projeto (`src/hooks/useFacebookPixel.tsx`), podemos adicionar o script do Google Ads (gtag.js) para rastrear conversões e remarketing.

### O que preciso de você
Para implementar, preciso do seu **ID de conversão do Google Ads** (formato: `AW-XXXXXXXXXX`). Você encontra isso no painel do Google Ads em **Ferramentas > Conversões**.

### Plano de implementação

1. **Criar hook `useGoogleAds.tsx`** — Similar ao `useFacebookPixel.tsx`, com funções para:
   - Carregar o script `gtag.js`
   - Rastrear PageView
   - Rastrear conversões (compra, lead, etc.)

2. **Adicionar no `index.html`** — Inserir o script global do gtag.js no `<head>`

3. **Integrar na Landing Page e páginas de conversão** — Disparar eventos nos mesmos pontos onde o Facebook Pixel já dispara (checkout, registro, etc.)

### Arquivos envolvidos
- `index.html` — Script global do gtag.js
- `src/hooks/useGoogleAds.tsx` — Novo hook (seguindo o padrão do Facebook Pixel)
- `src/pages/LandingPage.tsx` — Integração dos eventos
- `src/pages/PagamentoSucesso.tsx` — Evento de conversão de compra

### Próximo passo
Me envie seu **ID de conversão do Google Ads** (`AW-XXXXXXXXXX`) e, se tiver, os **IDs das ações de conversão** específicas, que eu implemento tudo.


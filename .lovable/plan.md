

## Plano: Substituir Google Ads antigo pelo novo

Sim, existe uma integração completa do Google Ads com o ID antigo `AW-17945487409` em 3 locais. Vou substituir tudo pelo novo ID `AW-18059469688` e o novo label de conversão.

### Locais com o pixel antigo (a ser removido/atualizado)

1. **`index.html`** (linhas 35-41) — Script global gtag.js com ID antigo
2. **`src/hooks/useGoogleAds.tsx`** — Hook com ID e label de conversão antigos
3. **`src/pages/LandingPage.tsx`** e **`src/pages/PagamentoSucesso.tsx`** — Já usam o hook, não precisam de alteração

### Alterações

**1. `index.html`**
- Trocar o script `gtag.js?id=AW-17945487409` por `gtag.js?id=AW-18059469688`
- Trocar `gtag('config', 'AW-17945487409')` por `gtag('config', 'AW-18059469688')`

**2. `src/hooks/useGoogleAds.tsx`**
- Trocar `GOOGLE_ADS_ID` de `'AW-17945487409'` para `'AW-18059469688'`
- Trocar `CONVERSION_LABEL` de `'yx-VCLrj_P4bELHQie1C'` para `'WFR5CNOgl5gcEPjGtqND'`
- Adicionar `value: 0.0` e `currency: 'BRL'` no evento de conversão

Nenhum arquivo novo será criado. Os componentes `LandingPage` e `PagamentoSucesso` já consomem o hook e continuarão funcionando automaticamente com os novos IDs.


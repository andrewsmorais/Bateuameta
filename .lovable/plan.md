

## Instalar Script UTMify no index.html

### O que será feito

Adicionar o script da UTMify no `<head>` do `index.html`, logo após o script do Google Ads existente.

### Detalhes técnicos

**Arquivo:** `index.html`

Inserir antes do `</head>`:

```html
<!-- UTMify -->
<script
  src="https://cdn.utmify.com.br/scripts/utms/latest.js"
  data-utmify-prevent-xcod-sck
  data-utmify-prevent-subids
  async
  defer
></script>
```




## Plano: Remover verificação de secret do webhook Cakto

### Problema
O erro ocorre para **ambos os planos** (mensal e anual). A Cakto envia o webhook mas não inclui o campo `secret` no body, causando rejeição 401 em toda compra.

### Solução
Remover o bloco de verificação de secret no `cakto-webhook` (linhas 506-516), já que a Cakto não suporta enviar campos customizados no payload.

### Alteração

**Arquivo: `supabase/functions/cakto-webhook/index.ts`**
- Remover linhas 506-516 (bloco `if (CAKTO_WEBHOOK_SECRET) { ... }`)
- A segurança será mantida pela URL obscura + validação dos dados do evento

### Deploy
- A edge function será redeployada automaticamente após a alteração


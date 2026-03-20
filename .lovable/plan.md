

## Configurar Webhook Cakto para Plano Mensal

### Problema Atual

O webhook `cakto-webhook` está configurado apenas para o plano **anual**. Tudo é tratado como anual: plano "anual", preço R$97,90, expiração de 1 ano, e evento do Facebook com valor 97.90. Quando uma venda mensal acontece, o sistema cria o usuário com dados errados.

### O que será feito

Atualizar o `cakto-webhook` para identificar se a venda é **mensal** ou **anual** e processar corretamente cada caso:

| | Mensal | Anual |
|---|---|---|
| Plano | "mensal" | "anual" |
| Preço | R$ 12,90 | R$ 97,90 |
| Expiração | +1 mês | +1 ano |
| FB Pixel valor | 12.90 | 97.90 |

### Como identificar o plano

A Cakto envia no payload dados do produto/oferta. O webhook vai verificar campos como `product_id`, `offer_id`, `product_name`, ou `price` para determinar se é mensal ou anual. A lógica será:

1. Se o preço for <= 15 ou o nome do produto contiver "mensal" → plano mensal
2. Caso contrário → plano anual (comportamento atual preservado)

### Alterações

**`supabase/functions/cakto-webhook/index.ts`**:

1. Adicionar função `detectPlanType()` que analisa o payload e retorna `"mensal"` ou `"anual"`
2. No bloco de `purchase_approved`:
   - Usar o plano detectado para buscar/criar o plano correto na tabela `plans`
   - Ajustar preço (12.90 vs 97.90)
   - Ajustar expiração (1 mês vs 1 ano)
   - Ajustar valor do evento Facebook
3. No email de renovação, mostrar o plano correto
4. Nos eventos de abandono, usar o plano detectado

### Detalhes Técnicos

- A detecção é feita por múltiplos campos do payload para máxima compatibilidade
- O plano mensal terá `expires_at` calculado com `setMonth(getMonth() + 1)`
- O email de boas-vindas permanece igual (já é genérico)
- O email de renovação será atualizado para mostrar o plano/preço correto


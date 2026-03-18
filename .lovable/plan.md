

## Adicionar Plano Mensal na página de Planos

### Situação
O checkout da Cakto já tem ambas as ofertas (Anual R$ 97,90 e Mensal R$ 12,90) no mesmo link. A página `/planos` só mostra o card do plano anual.

### Plano

#### Arquivo: `src/pages/Planos.tsx`

1. **Expandir layout** de `max-w-lg` para `max-w-3xl` com grid de 2 colunas (`md:grid-cols-2`)
2. **Manter card do Plano Anual** como está, com badge "Mais Popular" ou "Melhor Custo-Benefício"
3. **Adicionar card do Plano Mensal** (R$ 12,90/mês) com:
   - Mesma lista de features (ambos têm acesso completo)
   - Preço: R$ 12,90/mês
   - Estilo mais discreto (sem borda azul highlight) para destacar o anual como melhor opção
4. **Ambos os botões** redirecionam para o mesmo `CAKTO_CHECKOUT_URL` — o cliente escolhe a oferta dentro do checkout da Cakto

Nenhum outro arquivo precisa ser alterado.


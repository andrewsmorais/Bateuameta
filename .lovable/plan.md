

## Plano: Atualizar Política de Privacidade e Termos de Uso

Atualizar dois arquivos para incluir o Google Play como processador de pagamentos no app Android.

### Alterações

**1. `src/pages/PoliticaPrivacidade.tsx` — Seção 7 (Compartilhamento de Dados)**

Substituir o item de "Processadores de pagamento (Mercado Pago)" por dois cenários:
- Google Play (compras dentro do app Android)
- Mercado Pago (compras pelo site)

**2. `src/pages/TermosDeUso.tsx` — Seção 4 (Planos e Assinatura)**

Adicionar parágrafo explicando os dois canais de compra:
- Site → Mercado Pago
- App Android → Google Play Billing

**3. `src/pages/TermosDeUso.tsx` — Seção 5 (Política de Reembolso)**

Reestruturar em dois blocos:
- Reembolso para compras pelo site (mantém regra atual: 7 dias via WhatsApp/e-mail)
- Reembolso para compras pelo Google Play (gerenciado pelo Google via histórico da Play Store)

### Observações
- Manterei o número de WhatsApp original `(12) 98179-6135` (o texto sugerido tinha um typo `(XX) 98779-6135`).
- Manterei a estrutura visual existente (mesmas classes Tailwind, ícones, espaçamentos).
- Atualizarei a data "Última atualização" para "Abril de 2026" em ambas as páginas.

